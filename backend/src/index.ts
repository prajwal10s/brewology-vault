import express, { Application } from "express";
import mongoose from "mongoose";
import connectToMongoDB from "./connection";
import * as dotenv from "dotenv";
import userRoutes from "./routes/user";
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;
const url: string = process.env.MONGODB_URL || "";
connectToMongoDB(url);

app.get("/", (req, res) => {
  res.send("you are on base page");
});

app.use("/user", userRoutes);
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
