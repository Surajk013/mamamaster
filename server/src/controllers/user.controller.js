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

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser)
      return res
        .status(409)
        .json({ message: "Username or email already exists" });

    //if avatar exists upload it to cloudinary
    let avatarLocalPath = null;
    let avatar = null;
    console.log("checking req.files");
    console.log(req.files);
    if (req.files && req.files?.avatar?.length > 0) {
      avatarLocalPath = req.files.avatar[0].path;
      avatar = await uploadOnCloudinary(avatarLocalPath);
    }

    //create a new user in the db
    const user = await User.create({
      username: username.toLowerCase(),
      avatar: avatar?.url,
      email,
      password,
    });

    //retrieve the newly created user
    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser)
      return res
        .status(500)
        .json({ message: "Something went wrong while registering the user" });

    return res
      .status(201)
      .json({ message: "user created successfully", user: createdUser });
  } catch (error) {
    console.log("error registering user", error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong while registering the user" });
  }
};
