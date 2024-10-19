import axios from "axios";
import env from "dotenv";

dotenv.config();

export const verifyCaptcha = async (token) => {
  const secretKey = process.env.SECRET_KEY; // Replace with your Google reCAPTCHA secret key
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await axios.post(url);
    return response.data.success;
  } catch (error) {
    console.error("Error verifying captcha:", error);
    return false;
  }
};
