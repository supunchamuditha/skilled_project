import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";

const connection = await connectDB();

export const createUser = [
  // validate the request body
  body("name")
    .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/)
    .withMessage("Name must contain only letters")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is required").normalizeEmail(), // email must be an email
  body("phone")
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/)
    .withMessage(
      "Phone number must be a valid format (e.g., (234) 298-8956 or +19479561896)"
    )
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 to 15 digits"), // phone number must be a valid format and between 10 to 15 digits
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[\W_]/)
    .withMessage(
      "Password must contain at least one special character (e.g. @, #, $, etc.)"
    ), // password must be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter, and one special character
  body("profile_picture").isURL().withMessage("Profile picture must be a URL"), // profile picture must be a URL

  async (req, res) => {
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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createUserQuery = `INSERT INTO users (name, email, phone, password, profile_picture, otp, role, date, status, otpExpiration, isVerified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      connection.query(
        createUserQuery,
        [
          name,
          email,
          phone,
          hashedPassword,
          profile_picture,
          0,
          "admin",
          new Date(),
          2,
          new Date(),
          "false",
        ],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Internal server error" });
          }

          return res.status(201).json({
            message: "Account created successfully",
          });
        }
      );
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
];
export const loginUser = [
  // validate the request body
  body("email").isEmail().withMessage("Email is required").normalizeEmail(), // email must be an email
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[\W_]/)
    .withMessage(
      "Password must contain at least one special character (e.g. @, #, $, etc.)"
    ), // password must be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter, and one special character

  async (req, res) => {
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

    const { email, password } = req.body;

    connection.query(checkAuthQuery, [email, password], (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.length !== 0) {
        const isPasswordCorrect = bcrypt.compare(password, result[0].password);

        if (!isPasswordCorrect) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        if (result[0].status == 2 || result[0].status == 1) {
          if (result[0].isVerified === "true") {
            return res
              .status(200)
              .json({ message: "Your account is verified." });
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
  },
];
