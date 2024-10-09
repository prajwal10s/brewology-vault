import express, { Application } from "express";
import mongoose from "mongoose";
import connectToMongoDB from "./connection";
import * as dotenv from "dotenv";
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;
const url: string = process.env.MONGODB_URL || "";
console.log(url);
connectToMongoDB(url);
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
