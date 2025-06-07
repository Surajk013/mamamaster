import { model, models, Schema } from "mongoose";
import { Lesson } from "./lessonContent.model.js";

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
    lessons: [Lesson],
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

export const Module = models?.Module || model("Module", ModuleSchema);
