// const nodemailer = require("nodemailer")
import nodemailer from "nodemailer";
import MailGen from "mailgen";
import sendEmail from "./utils/email.js";

async function emailController(req, res) {
  try {
    const r = await sendEmail(
      { name: "pavan", email: "mggpavan@gmail.com" },
      {
        intro: "Welcome to our service!",
        instructions: "Please take the necessary action.",
        buttonText: "Click here",
        buttonLink: "http://example.com",
      },
      "normal"
    );
    // console.log("Message sent: %s", info.messageId);
    res.json(r);
  } catch (error) {
    console.log(error);
  }
}

export default emailController;
