import mongoose from "mongoose";

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

export default connectDB;
