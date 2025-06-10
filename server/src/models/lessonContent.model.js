import mongoose, { Schema } from "mongoose";
import { Module } from "./module.model.js";

const CourseQuestionSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "multiple-choice",
      "true-false",
      "coding",
      "short-answer",
      "code-analysis",
    ],
    default: "multiple-choice",
    required: true,
  },
  //optional code block for code analysis based questions
  code: {
    type: String,
    required: function () {
      return this.type === "code-analysis";
    },
  },
  // Options for multiple-choice and true-false questions
  options: [
    {
      text: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
  ],
  // For index-based correct answers (multiple-choice)
  correctAnswer: {
    type: Number, // Index of correct option
    required: function () {
      return ["multiple-choice", "true-false", "code-analysis"].includes(
        this.type,
      );
    },
  },
  // For text-based answers (short-answer, coding)
  correctAnswerText: {
    type: String,
    required: function () {
      return ["short-answer", "coding"].includes(this.type);
    },
  },
  points: {
    type: Number,
    default: 10,
    min: 1,
  },
  explanation: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
});

// Add validation to ensure multiple-choice questions have options
CourseQuestionSchema.pre("validate", function (next) {
  if (["multiple-choice", "true-false", "code-analysis"].includes(this.type)) {
    if (!this.options || this.options.length === 0) {
      return next(new Error(`${this.type} questions must have options`));
    }

    // Ensure at least one correct answer for multiple-choice
    if (this.type === "multiple-choice") {
      const hasCorrectOption = this.options.some((option) => option.isCorrect);
      if (
        !hasCorrectOption &&
        (this.correctAnswer === undefined || this.correctAnswer === null)
      ) {
        return next(
          new Error(
            "Multiple-choice questions must have at least one correct answer",
          ),
        );
      }
    }

    // True-false should have exactly 2 options
    if (this.type === "true-false" && this.options.length !== 2) {
      return next(
        new Error("True-false questions must have exactly 2 options"),
      );
    }
  }

  next();
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

export const lessonSchema = new Schema(
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
// lessonSchema.index({ slug: 1 });
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
