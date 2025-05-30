import mongoose, { model, models, Schema } from "mongoose";
import { User } from "./user.model.js";
import { Course } from "./course.model.js";
import { Module, Lesson } from "./module.model.js";

const userCourseSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    courses: [
      {
        courseID: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        status: {
          type: String,
          enum: ["Completed", "In-Progress", "Not-Started"],
        },
      },
    ],
    modules: [
      {
        moduleID: {
          type: Schema.Types.ObjectId,
          ref: "Module",
          required: true,
        },
        courseIDs: [
          {
            type: Schema.Types.ObjectId,
          },
        ],
        status: {
          type: String,
          enum: ["Completed", "In-Progress", "Not-Started"],
        },
        lessonsCompleted: [
          {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
          },
        ],
      },
    ],
  },
  { _id: false },
);

// Add indexes for better performance
userCourseSchema.index({ userID: 1 });
userCourseSchema.index({ "courses.courseID": 1 });
userCourseSchema.index({ "modules.moduleID": 1 });

export const UserCourses =
  models?.UserCourses || model("UserCourses", userCourseSchema);
