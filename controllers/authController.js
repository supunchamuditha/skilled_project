import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import generateToken from "../utils/generateToken.js";
import { createUserHelper } from "../helpers/userHelper.js";

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
  const connection = await connectDB();

  const { email, password } = req.body;

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
            email: result[0].email,
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
