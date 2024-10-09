import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); 

export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    const verificationUrl = `${process.env.VERIFICATION_URL}?email=${email}&code=${verificationCode}`;

    let mailOptions = {
      from: `"Your Company" <${process.env.EMAIL_USER}>`, 
      to: email, 
      subject: "Account Verification Code", 
      html: `<p>Your verification code is <b>${verificationCode}</b></p>
             <p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
