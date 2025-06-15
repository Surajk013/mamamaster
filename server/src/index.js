import dotenv from "dotenv";
import connectDB from "./db.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
); //cors can be set with many options read docc

app.use(express.json({ limit: "64kb" })); //in forms
app.use(express.urlencoded({ extended: true, limit: "64kb" })); //from url
app.use(express.static("public")); //some assets which can be seen by everyone
app.use(cookieParser());

dotenv.config({
  path: "../.env",
});

import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

connectDB().then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log("server is running at port", process.env.PORT);
  });
});
