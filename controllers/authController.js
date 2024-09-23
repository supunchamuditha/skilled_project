import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import connectDB from "../config/db.js";
import generateToken from "../utils/generateToken.js";
import { createUserHelper } from "../helpers/userHelper.js";
import {
  generateVerificationToken,
  getVerificationTokenExpiration,
} from "../utils/generateVerifyCode.js";

const connection = await connectDB();

export const createUser_admin = async (req, res) => {
  return createUserHelper(req, res, "admin");
};

export const createUser_recruiter = async (req, res) => {
  return createUserHelper(req, res, "recruiter");
};

export const createUser_candidate = async (req, res) => {
  return createUserHelper(req, res, "candidate");
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      message: error
        .array()
        .map((error) => error.msg)
        .join("||"),
    });
  }

  const checkAuthQuery = `SELECT * FROM users WHERE email = ?`;

  connection.query(checkAuthQuery, [email], async (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length !== 0) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        result[0].password
      );

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      if (result[0].status == 2 || result[0].status == 1) {
        generateToken(
          {
            id: result[0].id,
            role: result[0].role,
            status: result[0].status,
          },
          res
        );

        if (result[0].isVerified === "true") {
          return res.status(200).json({ message: "Your account is verified." });
        }

        if (result[0].isVerified === "false") {
          return res
            .status(200)
            .json({ message: "Your account is not verified." });
        }
      }
    }
    return res.status(400).json({ message: "Invalid credentials" });
  });
};

export const verifyUser = async (req, res) => {
  try {
    const userid = req.userid;
    const verificationCode = +req.body.verificationCode;

    const currentTime = new Date();
    const currentDate = new Date(currentTime.getTime());
    currentDate.setMilliseconds(0);

    const checkVerifyCodeQuery = `SELECT otp, otpExpiration  FROM users WHERE id = ? AND isVerified = "false" AND status = 2`;

    connection.query(checkVerifyCodeQuery, [userid], async (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (
        result.length !== 0 &&
        result[0].otp === verificationCode &&
        result[0].otpExpiration > currentDate
      ) {
        const updateUserQuery = `UPDATE users SET isVerified = "true", status = 1 WHERE id = ?`;
        connection.query(updateUserQuery, [userid], (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Internal server error" });
          }

          if (result.length !== 0) {
            return res.status(200).json({ message: "User verified" });
          }
        });
      } else {
        return res.status(400).json({ message: "Invalid verification code" });
      }
    });
  } catch (error) {
    console.error("Error in verifyUser:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateVerifyCode = async (req, res) => {
  try {
    const userid = req.userid;
    const verificationToken = generateVerificationToken();
    const verificationTokenExpiration = getVerificationTokenExpiration();

    const updateVerifyCodeQuery = `UPDATE users SET otp = ?, otpExpiration = ? WHERE id = ? AND isVerified = "false" AND status = 2`;
    connection.query(
      updateVerifyCodeQuery,
      [verificationToken, verificationTokenExpiration, userid],
      async (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (result.affectedRows !== 0) {
          return res.status(200).json({ message: "Verification code sent" });
        }
        return res.status(400).json({ message: "Invalid credentials" });
      }
    );
  } catch (error) {
    console.error("Error in updateVerifyCode:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
