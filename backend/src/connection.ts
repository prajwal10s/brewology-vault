import mongoose from "mongoose";
const connectToMongoDB = async (url: string): Promise<typeof mongoose> => {
  try {
    const conn = await mongoose.connect(url);
    return conn;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { connectToMongoDB };
