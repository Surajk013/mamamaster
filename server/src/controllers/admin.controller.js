import { Course } from "../models/course.model.js";
import { Module } from "../models/module.model.js";
import { Lesson } from "../models/lessonContent.model.js";
import mongoose from "mongoose";

//need to add express validator to escape xss
export const addCourse = async (req, res) => {
  try {
    const course = req.body;
    const modules = course.modules;
    console.log(modules);
    //each course has multiple modules (referenced so not an issue)
    //each module contains multiple lessons.. hmm
    //each lesson contains multiple questions

    //use transactions
    const session = await mongoose.startSession();
    const courseModules = [];

    //shoot for each dont wait for promises to resolve apparently smh
    // modules.forEach(async (module) => {
    //   const addModule = await Module.create(...module);
    //   courseModules.push(addModule);
    // });

    for (const module of modules) {
      const addModule = await Module.create(module, { session });
      courseModules.push(addModule);
    }

    return res.status(200).json({ message: "okay" });
  } catch (error) {
    console.log("Error adding courses", error.message);
  }
};
