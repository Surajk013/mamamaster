import { Course } from "../models/course.model.js";
import { Module } from "../models/module.model.js";
import mongoose from "mongoose";

//need to add express validator to escape xss
export const addCourse = async (req, res) => {
  //each course has multiple modules (referenced so not an issue)
  //each module contains multiple lessons.. hmm
  //each lesson contains multiple questions
  let session = await mongoose.startSession();

  try {
    const { title, thumbnail, difficulty, description, modules } = req.body;

    //use transactions
    const courseModules = [];
    //This operation is a no-op. The transaction won't start on the
    //server until the first command is sent on the session.
    session.startTransaction();

    //shoot for each dont wait for promises to resolve apparently smh
    // modules.forEach(async (module) => {
    //   const addModule = await Module.create(...module);
    //   courseModules.push(addModule);
    // });

    // add the modules and lessons tp the db first (embedded)
    for (const module of modules) {
      let addModule = await Module.create([module], { session });
      courseModules.push(addModule[0]._id);
      console.log(courseModules);
    }

    const addCourse = await Course.create(
      [
        {
          title,
          description,
          thumbnail,
          difficulty,
          modules: courseModules,
        },
      ],
      { session },
    );

    await session.commitTransaction();

    if (addCourse[0]._id)
      return res.status(200).json({ message: "Course Successfully Added" });
  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction failed:", error);
    console.log("Error adding courses", error.message);
    return res.status(500).json({ message: "Server error" });
  } finally {
    session.endSession(); // End the session
  }
};

export const getCourse = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error fetching Courses");
    return res.status(200).json({ message: "Server Error" });
  }
};
