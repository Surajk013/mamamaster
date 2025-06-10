import mongoose from "mongoose";
const { model, models, Schema } = mongoose;

import { lessonSchema as Lesson } from "./lessonContent.model.js";

// const LessonSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   content: [Lesson],
// questions: [CourseQuestionSchema],
// completionCriteria: {
//   type: String,
//   enum: ["view", "quiz-pass", "both"],
//   default: "both",
// },
// passingScore: {
//   type: Number,
//   default: 70, // Percentage required to pass
// },
// });

const ModuleSchema = new Schema(
  {
    thumbnail: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    orderInCourse: {
      type: Number,
      required: true,
    },
    lessons: [Lesson],
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard", "insane"],
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true, // allows null values but enforces uniqueness when present
    },
    // finalQuiz: {
    //   isEnabled: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   questions: [CourseQuestionSchema],
    //   passingScore: {
    //     type: Number,
    //     default: 70,
    //   },
    // },
  },
  { timestamps: true },
);

// Pre-save middleware to generate slug if not provided
ModuleSchema.pre("save", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }
  next();
});

export const Module = models?.Module || model("Module", ModuleSchema);
