import express, { Application } from "express";
import mongoose from "mongoose";
const connectToMongoDB   = require("./connection");
const app: Application = express();
const PORT = process.env.PORT || 5000;

connectToMongoDB(process.env.MONGODB_URL);
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
