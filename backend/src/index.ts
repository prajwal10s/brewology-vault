import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./connection";
import * as dotenv from "dotenv";
import userRoutes from "./routes/user";
import recipeRoutes from "./routes/recipe";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;
const url: string = process.env.MONGODB_URL || "";

app.use(
  cors({
    origin: "http://localhost:3000", // Only allow requests from your frontend
    methods: "GET,POST", // Allow only certain HTTP methods
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

connectToMongoDB(url);

app.get("/", (req, res) => {
  res.send("you are on base page");
});

app.use("/user", userRoutes);
app.use("/recipe", recipeRoutes);
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
