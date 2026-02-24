import nodemailer from "nodemailer";
import MailGen from "mailgen";

// Utility function to send customized email
async function sendEmail(user, message, status) {
  // Configuration for nodemailer
  const config = {
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  };

  // Create nodemailer transport
  const transporter = nodemailer.createTransport(config);

  // Dynamic theme based on status
  let theme;
  let buttonColor;

  if (status === "success") {
    theme = "neopolitan"; // You can choose another theme for success
    buttonColor = "#33b5e5"; // Blue button for success
  } else if (status === "accept") {
    theme = "default"; // Default theme for normal status
    buttonColor = "#ffa500"; // Orange button for normal status
  } else if (status === "error") {
    theme = "default"; // Default theme for error status
    buttonColor = "#ff4c4c"; // Red button for error
  }

  // Configure MailGen instance
  const mailGenerator = new MailGen({
    theme: theme,
    product: {
      name: "Farmer's Assistant",
      link: "http://localhost:5173/dashboard?tab=myactivities",
    },
  });

  // Construct the email body
  const email = {
    body: {
      name: user.username,
      intro: message?.intro || "Welcome to our service!",
      action: {
        instructions:
          message?.instructions || "Please take the necessary action.",
        button: {
          color: buttonColor,
          text: message?.buttonText || "Click here",
          link: message?.buttonLink || "http://example.com",
        },
      },
    },
  };

  const emailTemp = mailGenerator.generate(email);

  try {
    // Sending the email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: user.email, // recipient's email
      subject: message?.subject || "Important Notification", // Subject line
      text: message?.text || "This is the plain text body", // Plain text body
      html: emailTemp, // HTML body generated from MailGen
    });
    console.log(user);

    // console.log("Message sent: %s", info.messageId);
    return { info, preview: nodemailer.getTestMessageUrl(info) };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email");
  }
}

export default sendEmail;
