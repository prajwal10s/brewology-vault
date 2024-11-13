import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectToMongoDB from "./connection";
import * as dotenv from "dotenv";
import userRoutes from "./routes/user";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;
const url: string = process.env.MONGODB_URL || "";

app.use(
  cors({
    origin: "http://localhost:3000", // Only allow requests from your frontend
    methods: "GET,POST", // Allow only certain HTTP methods
  })
);

app.use(express.json());
connectToMongoDB(url);

app.get("/", (req, res) => {
  res.send("you are on base page");
});

app.use("/user", userRoutes);
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
