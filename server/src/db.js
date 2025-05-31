import mongoose from "mongoose";
import { User } from "./models/user.model.js";
import process from "process";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
    );
    console.log(
      "MongoDB connected!! DB Host:",
      connectionInstance.connection.host,
    );
  } catch (error) {
    console.log("mongoDB connection error", error.message);
    process.exit(1);
  }
};

//default admin account to upload course content
(async () => {
  try {
    const isAdminRegistered = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });
    if (!isAdminRegistered) {
      const admin = await User.create({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
        email: process.env.ADMIN_EMAIL,
      });

      if (admin) console.log("Admin registered Successfully");
    }
  } catch (error) {
    console.log("Error registering admin", error.message);
  }
})();

export default connectDB;
