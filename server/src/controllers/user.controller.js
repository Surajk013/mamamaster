import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

//take the image from the user (multer)
//save it locally temporarily  and then upload it to cloudinary
//remove the local image.
// Send the url of the image on cloudinary to the user

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (
      [username, email, password].some((field) => !field || field.trim() === "")
    )
      return res.status(400).json({ message: "All the fields must be filled" });

    //verification and saving logic to be written
  } catch (error) {
    console.log("error registering user");
  }
};
