import sgMail from "@sendgrid/mail";
import * as dotenv from "dotenv";
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
export const sendEmail = async (toEmail: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  const randString = generateRandString();
  try {
    await sgMail.send({
      to: toEmail,
      from: process.env.senderEmail || "",
      subject: "Trying email setup with Sendgrid",
      text: randString,
    });
  } catch (error) {
    console.log("Error sending verification email");
  }
};
