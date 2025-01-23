import sgMail from "@sendgrid/mail";
import * as dotenv from "dotenv";
dotenv.config();
export const sendEmail = async (toEmail: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  try {
    await sgMail.send({
      to: toEmail,
      from: process.env.senderEmail || "",
      subject: "Just trying to send the mail with Sendgrid",
      text: "Let's hope this setup ",
    });
  } catch (error) {
    console.log(error);
  }
};
