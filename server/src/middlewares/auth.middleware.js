import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ Message: "Token required" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      return res.status(403).json({ message: "Invalid Access Token" });
    }

    req.user = user; //attach user to request
    next();
  } catch (error) {
    console.log("Error Veifying JWT", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    if (req.user?.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "foff" });
    }
    next();
  } catch (error) {
    console.log("Error verifing admin", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};
