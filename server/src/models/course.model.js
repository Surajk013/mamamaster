import mongoose from "mongoose";
const { model, models, Schema } = mongoose;

import { Module } from "./module.model.js";

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    modules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true },
);

export const Course = models?.Course || model("Course", CourseSchema);
