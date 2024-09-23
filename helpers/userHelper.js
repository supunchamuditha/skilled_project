import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import connectDB from "../config/db.js";
import generateToken from "../utils/generateToken.js";
import {
  generateVerificationToken,
  getVerificationTokenExpiration,
} from "../utils/generateVerifyCode.js";

const connection = await connectDB();

export const checkUserExists = async (email, phone) => {
  const checkUserQuery = `SELECT * FROM users WHERE email = ? OR phone = ?`;

  return new Promise((resolve, reject) => {
    connection.query(checkUserQuery, [email, phone], (err, result) => {
      if (err) {
        return reject(new Error("Internal server error"));
      }
      return resolve(result.length > 0);
    });
  });
};

export const createUserHelper = async (req, res, role) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      message: error
        .array()
        .map((error) => error.msg)
        .join("||"),
    });
  }

  const { name, email, phone, password, profile_picture } = req.body;

  try {
    const userExists = await checkUserExists(email, phone);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = generateVerificationToken();
    const verificationTokenExpiration = getVerificationTokenExpiration();

    const createUserQuery = `INSERT INTO users (name, email, phone, password, profile_picture, otp, role, date, status, otpExpiration, isVerified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(
      createUserQuery,
      [
        name,
        email,
        phone,
        hashedPassword,
        profile_picture,
        verificationToken,
        role,
        new Date(),
        2,
        verificationTokenExpiration,
        "false",
      ],
      (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ message: "Internal server error" });
        }

        const id = result.insertId;
        const data = { id: id, role: "admin", status: 2 };
        generateToken(data, res);

        return res.status(201).json({
          message: "Account created successfully",
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
