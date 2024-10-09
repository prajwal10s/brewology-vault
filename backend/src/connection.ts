import mongoose from "mongoose";
const connectToMongoDB = async (url: string): Promise<typeof mongoose> => {
  try {
    const conn = await mongoose.connect(url);
    console.log("Connection successful!");
    return conn;
  } catch (err) {
    console.log("Connection failed!");
    console.error(err);
    throw err;
  }
};

export default connectToMongoDB;
