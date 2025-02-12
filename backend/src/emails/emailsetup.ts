import sgMail from "@sendgrid/mail";
import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { emailTokenModel } from "../models/emailToken";
dotenv.config();
const generateRandString = () => {
  let url = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 16; i++) {
    url += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return url;
};
export const sendEmail = async (toEmail: string, userName: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  const randString = generateRandString();
  const newEmailToken = new emailTokenModel({
    token: randString,
    userName,
  });
  try {
    await newEmailToken.save();
  } catch (error) {
    console.log(error);
  }
  try {
    await sgMail.send({
      to: toEmail,
      from: process.env.senderEmail || "",
      subject: "Trying email setup with Sendgrid",
      text: `Please click on link to verify email address. 
            localhost:3000/verify/${randString}`,
    });
  } catch (error) {
    console.log("Error sending verification email");
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.params.token;
  try {
    const emailToken = await emailTokenModel.findOne({
      token,
    });
    const userName = emailToken?.userName;
    await User.updateOne({ userName: userName }, { $set: { isActive: true } });
    await emailTokenModel.deleteOne({ token });
    res.status(200).json({ message: "Email Verified" });
  } catch (error) {
    res.status(400).json({ message: "Error occured. Please try again!" });
    console.log(error);
  }
};
