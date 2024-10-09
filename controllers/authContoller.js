import { send } from "process";
import db from "../configs/db.js";
import { existsUser } from "../helpers/authHelper.js";
import {
  generateVerificationToken,
  getVerificationTokenExpiration,
} from "../utils/generateCode.js";
import generateToken from "../utils/generateToken.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { validationResult } from "express-validator";
import { sendVerificationEmail } from "../utils/sendEmail.js";

//test API
export const testAPI = (req, res) => {
  res.send("Auth route test API");
};

//registerUser API
export const registerUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const err = error
      .array()
      .map((error) => error.msg)
      .join(", ");

    console.error("Error in registerUser", err);

    return res.status(400).json({
      error: err,
    });
  }
  // return res.send(req.body);
  const {
    full_name,
    email,
    phone_num,
    location,
    gender,
    cv,
    profile_pic,
    password,
  } = req.body;

  try {
    const existsUserCheck = await existsUser(email, res);

    if (existsUserCheck) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const verificationCode = generateVerificationToken();
    const isVerified = "false";

    const userQuery = `INSERT INTO users (full_name, email, phone_num, location, gender, cv, profile_pic, password, verificationCode, verificationExpiration, isVerified, date, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const connect = await db();

    connect.query(
      userQuery,
      [
        full_name,
        email,
        phone_num,
        location,
        gender,
        cv,
        profile_pic,
        hashedPassword,
        verificationCode,
        getVerificationTokenExpiration(),
        isVerified,
        new Date(),
        1,
      ],
      (error, result) => {
        if (error) {
          console.error("Error in registerUser", error.message);
          res.status(500).send({ message: "Internal server error" });
        }

        const data = {
          id: result.insertId,
          userType: "user",
        };

        sendVerificationEmail(email, verificationCode);
        
        generateToken(data, res);

        res.status(200).send({ isVerified: isVerified });
      }
    );
  } catch (error) {
    console.error("Error in registerUser", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const err = error
      .array()
      .map((error) => error.msg)
      .join(", ");

    console.error("Error in registerUser", err);

    return res.status(400).json({
      error: err,
    });
  }
  const { email, password } = req.body;

  try {
    const connect = await db();

    const checkUserQuery = `SELECT * FROM users WHERE email = ?`;

    connect.query(checkUserQuery, [email], async (error, result) => {
      if (error) {
        console.error("Error in loginUser", error.message);
        res.status(500).send({ message: "Internal server error" });
      }

      if (result.length === 0) {
        return res.status(400).send({ message: "User does not exist" });
      }

      const isPasswordCorrect = await comparePassword(
        password,
        result[0].password
      );

      if (isPasswordCorrect) {
        if (result[0].status === 1) {
          const data = {
            id: result.insertId,
            userType: "user",
          };

          generateToken(data, res);

          if (result[0].isVerified === "true") {
            res.status(200).send({ isVerified: result[0].isVerified });
          } else {
            res.status(200).send({ isVerified: result[0].isVerified });
          }
        } else {
          res.status(400).send({ message: "User is blocked" });
        }
      } else {
        res.status(400).send({ message: "Invalid password" });
      }
    });
  } catch (error) {
    console.error("Error in loginUser", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const registerCompany = async (req, res) => {};

export const loginCompany = async (req, res) => {};

export const verifyToken = async (req, res) => {};

export const resendVerificationToken = async (req, res) => {};

export const forgotPassword = async (req, res) => {};

export const logout = async (req, res) => {};
