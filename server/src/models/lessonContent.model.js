import mongoose, { Schema } from "mongoose";

const CourseQuestionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["multiple-choice", "true-false", "coding", "short-answer"],
    default: "multiple-choice",
    required: true,
  },
  options: [
    {
      text: String,
      isCorrect: Boolean,
    },
  ],
  correctAnswer: {
    type: String, // For non-multiple choice questions
  },
  points: {
    type: Number,
    default: 10,
  },
  explanation: {
    type: String,
  },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
});

const inlineElementSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["text", "code", "link", "image", "bold", "italic"],
      required: true,
    },
    content: {
      // For text, bold, italic
      text: String,

      // For code
      code: String,

      // For links
      url: String,
      linkText: String,

      // For inline images
      src: String,
      alt: String,
    },
  },
  { _id: false },
);

// Main Content Block Schema
const contentBlockSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "heading",
        "paragraph",
        "mixed-paragraph", // for complex paragraphs with inline elements
        "image",
        "code-block",
        "list",
        "table",
        "divider",
        "quote",
      ],
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },

    // Content varies by block type
    content: {
      // For heading blocks
      heading: {
        text: String,
        level: {
          type: Number,
          min: 1,
          max: 6,
          default: 1,
        },
      },

      // For simple paragraph blocks
      paragraph: {
        text: String,
      },

      // For complex paragraphs with mixed inline elements
      mixedParagraph: {
        elements: [inlineElementSchema],
      },

      // For image blocks
      image: {
        src: String, // Cloudinary URL
        alt: String,
        caption: String,
        width: Number,
        height: Number,
        alignment: {
          type: String,
          enum: ["left", "center", "right"],
          default: "center",
        },
      },

      // For code blocks
      codeBlock: {
        code: String,
        language: String,
        showLineNumbers: {
          type: Boolean,
          default: false,
        },
      },

      // For list blocks
      list: {
        type: {
          type: String,
          enum: ["ordered", "unordered"],
          default: "unordered",
        },
        items: [String],
      },

      // For table blocks
      table: {
        headers: [String],
        rows: [[String]], // Array of arrays for table data
        hasHeader: {
          type: Boolean,
          default: true,
        },
      },

      // For quote blocks
      quote: {
        text: String,
        author: String,
        source: String,
      },
    },
  },
  { _id: false },
);

// Updated Lesson Schema
const lessonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // description: {
    //   type: String,
    //   trim: true,
    // },

    // The main content as blocks
    contentBlocks: [contentBlockSchema],

    slug: {
      type: String,
      unique: true,
      sparse: true, // allows null values but enforces uniqueness when present
    },

    // Module relationship
    moduleID: {
      type: Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },

    // Order within module
    orderInModule: {
      type: Number,
      required: true,
    },
    questions: [CourseQuestionSchema],
    passingScore: {
      type: Number,
      default: 70, // Percentage required to pass
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for performance
lessonSchema.index({ moduleID: 1, orderInModule: 1 });
lessonSchema.index({ slug: 1 });
lessonSchema.index({ isPublished: 1 });

// Pre-save middleware to generate slug if not provided
lessonSchema.pre("save", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }
  next();
});

export const Lesson =
  mongoose.models?.Lesson || mongoose.model("Lesson", lessonSchema);
