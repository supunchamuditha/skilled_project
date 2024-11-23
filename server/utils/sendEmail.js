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
      subject: "Verify Your Account - Your Company Name",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <header style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Welcome to Your Company!</h1>
            </header>
            <div style="padding: 20px;">
              <p style="font-size: 16px;">Hi there,</p>
              <p style="font-size: 16px;">Thank you for signing up with <strong>Your Company Name</strong>. To complete your registration, please verify your email using the OTP code below:</p>
              <div style="text-align: center; margin: 20px 0;">
                <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 2px dashed #4CAF50; border-radius: 8px;">
                  ${verificationCode}
                </span>
              </div>
              <p style="font-size: 16px;">Alternatively, you can verify your account by clicking the link below:</p>
              <p style="text-align: center;">
                <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; font-size: 16px; border-radius: 4px;">
                  Verify My Account
                </a>
              </p>
              <p style="font-size: 14px; color: #666;">If you didn’t request this email, please ignore it.</p>
            </div>
            <footer style="background-color: #f1f1f1; color: #666; text-align: center; padding: 10px;">
              <p style="font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
              <p style="font-size: 12px; margin: 0;">123 Business Street, City, Country</p>
            </footer>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
