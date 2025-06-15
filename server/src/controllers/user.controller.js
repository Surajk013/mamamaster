import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

//take the image from the user (multer)
//save it locally temporarily  and then upload it to cloudinary
//remove the local image.
// Send the url of the image on cloudinary to the user

export const generateAccessToken = async (userId, res) => {
  try {
    const user = await User.findById(userId);
    //for now since we calling this from login function (we've already verified
    //if the user exists there itself). If calling from other places check verification.

    const accessToken = user.generateAccessToken();

    return accessToken;
  } catch (error) {
    console.log("Error while generating access token", error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong while logging in" });
  }
};

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

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "All the fields should be filled" });

    const user = await User.findOne({
      email,
    });

    if (!user)
      return res
        .status(404)
        .json({ message: "User with provided email doesnt exist" });

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Password Invalid" });

    const accessToken = await generateAccessToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json({ messsage: "User logged in successfully", user: loggedInUser });
  } catch (error) {
    console.log("Error logging in user", error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong while logging in" });
  }
};

//shoot discoverded express validator now. Need to use it from next time.
//logout only frontend for now. Need to add redis later.
//export const logoutUser = async (req, res) => {};
