import { validationResult } from "express-validator";

import db from "../configs/db.js";
import { existsCompany, existsUser } from "../helpers/authHelper.js";
import {
  generateVerificationToken,
  getVerificationTokenExpiration,
} from "../utils/generateCode.js";
import generateToken from "../utils/generateToken.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
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

//loginUser API
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
            id: result[0].id,
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

//registerCompany API
// Register Company API
export const registerCompany = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors
        .array()
        .map((error) => error.msg)
        .join(", ");

      console.error("Error in registerCompany", err);

      return res.status(400).json({
        error: err,
      });
    }

    const { name, email, phone_num, location, industry, password } = req.body;

    const existsCompanyCheck = await existsCompany(email, res);

    if (existsCompanyCheck) {
      return res.status(400).send({ message: "Company already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const verificationCode = generateVerificationToken();
    const isVerified = "false";

    // Get the logo file
    const logo = req.file.buffer;
    const logo_type = req.file.mimetype;

    const companyQuery = `INSERT INTO companies (name, email, phone_num, location, industry, logo, logo_type, password, verificationCode, verificationExpiration, isVerified, date, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const connect = await db();

    connect.query(
      companyQuery,
      [
        name,
        email,
        phone_num,
        location,
        industry,
        logo,
        logo_type,
        hashedPassword,
        verificationCode,
        getVerificationTokenExpiration(),
        isVerified,
        new Date(),
        1,
      ],
      (error, result) => {
        if (error) {
          console.error("Error in registerCompany", error.message);
          return res.status(500).send({ message: "Internal server error" });
          
        }

        const data = {
          id: result.insertId,
          userType: "company",
        };

        sendVerificationEmail(email, verificationCode);

        generateToken(data, res);

        res.status(200).send({ isVerified: isVerified });
      }
    );
  } catch (error) {
    console.error("Error in registerCompany", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};

//loginCompany API
export const loginCompany = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const err = error
        .array()
        .map((error) => error.msg)
        .join(", ");

      console.error("Error in loginCompany", err);

      return res.status(400).json({
        error: err,
      });
    }
    const { email, password } = req.body;

    const connect = await db();

    const checkUserQuery = `SELECT * FROM companies WHERE email = ?`;

    connect.query(checkUserQuery, [email], async (error, result) => {
      if (error) {
        console.error("Error in loginCompany", error.message);
        res.status(500).send({ message: "Internal server error" });
      }

      if (result.length === 0) {
        return res.status(400).send({ message: "company does not exist" });
      }

      const isPasswordCorrect = await comparePassword(
        password,
        result[0].password
      );

      if (isPasswordCorrect) {
        if (result[0].status === 1) {
          const data = {
            id: result[0].id,
            userType: "company",
          };

          generateToken(data, res);

          if (result[0].isVerified === "true") {
            res.status(200).send({ isVerified: result[0].isVerified });
          } else {
            res.status(200).send({ isVerified: result[0].isVerified });
          }
        } else {
          res.status(400).send({ message: "Company is blocked" });
        }
      } else {
        res.status(400).send({ message: "Invalid password" });
      }
    });
  } catch (error) {
    console.error("Error in loginCompany", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};

//verifyToken API
export const verifyToken = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const err = error
        .array()
        .map((error) => error.msg)
        .join(", ");

      console.error("Error in loginCompany", err);

      return res.status(400).json({
        error: err,
      });
    }

    const userId = req.userId;
    const userType = req.userType;
    const { verificationCode } = req.body;

    console.log(userId, userType);
    const currentTime = new Date();
    const currentDate = new Date(currentTime.getTime());
    currentDate.setMilliseconds(0);

    const connect = await db();

    if (userType === "user") {
      const checkUserCode = `SELECT verificationCode, verificationExpiration, isVerified FROM users WHERE id = ? AND status = 1`;

      connect.query(checkUserCode, [userId], (error, result) => {
        if (error) {
          console.error("Error in verifyToken for user", error.message);
          return res.status(500).send({ message: "Internal server error" });
        }

        if (result.length === 0) {
          return res.status(400).send({ message: "User does not exist" });
        } else {
          if (result[0].isVerified === "true") {
            return res
              .status(400)
              .send({ message: "User is already verified" });
          } else {
            if (result[0].verificationExpiration < currentDate) {
              return res.status(400).send({ message: "Token expired" });
            } else if (result[0].verificationCode === verificationCode) {
              const updateQuery = `UPDATE users SET isVerified = ? WHERE id = ?`;

              connect.query(updateQuery, ["true", userId], (error, result) => {
                if (error) {
                  console.error("Error in verifying user", error.message);
                  return res
                    .status(500)
                    .send({ message: "Internal server error" });
                }

                return res.status(200).send({ message: "User verified" });
              });
            } else {
              return res
                .status(400)
                .send({ message: "Invalid verification code" });
            }
          }
        }
      });
    } else if (userType === "company") {
      const checkCompanyCode = `SELECT verificationCode, verificationExpiration, isVerified FROM companies WHERE id = ? AND status = 1`;

      connect.query(checkCompanyCode, [userId], (error, result) => {
        if (error) {
          console.error("Error in verifyToken for company", error.message);
          return res.status(500).send({ message: "Internal server error" });
        }

        if (result.length === 0) {
          return res.status(400).send({ message: "Company does not exist" });
        } else {
          if (result[0].isVerified === "true") {
            return res
              .status(400)
              .send({ message: "Company is already verified" });
          } else {
            if (result[0].verificationExpiration < currentDate) {
              return res.status(400).send({ message: "Token expired" });
            } else if (result[0].verificationCode === verificationCode) {
              const updateQuery = `UPDATE companies SET isVerified = ? WHERE id = ?`;

              connect.query(updateQuery, ["true", userId], (error, result) => {
                if (error) {
                  console.error("Error in verifying company", error.message);
                  return res
                    .status(500)
                    .send({ message: "Internal server error" });
                }

                return res.status(200).send({ message: "Company verified" });
              });
            } else {
              return res
                .status(400)
                .send({ message: "Invalid verification code" });
            }
          }
        }
      });
    } else {
      return res.status(400).send({ message: "Invalid user type" });
    }
  } catch (error) {
    console.error("Error in verifyToken", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};

//resendVerificationToken API
export const resendVerificationToken = async (req, res) => {
  try {
    const userId = req.userId;
    const userType = req.userType;

    console.log(userId, userType);
    const connect = await db();

    const verificationCode = generateVerificationToken();
    const date = getVerificationTokenExpiration();

    if (!!userType) {
      let userTypes = "";
      if (userType === "user") {
        userTypes = "users";
      } else if (userType === "company") {
        userTypes = "companies";
      }

      const getQuery = `SELECT email FROM ${userTypes} WHERE id = ? AND status = 1 AND isVerified = 'false'`;

      connect.query(getQuery, [userId], (error, result) => {
        if (error) {
          console.error("Error in resendVerificationToken", error.message);
          return res.status(500).send({ message: "Internal server error" });
        }

        if (result.length === 1) {
          const updateQuery = `UPDATE ${userTypes} SET verificationCode = ?, verificationExpiration = ? WHERE id = ? AND status = 0 AND isVerified = false`;

          connect.query(
            updateQuery,
            [verificationCode, date, userId],
            (error) => {
              if (error) {
                console.error(
                  "Error in resendVerificationToken",
                  error.message
                );
                return res
                  .status(500)
                  .send({ message: "Internal server error" });
              }

              if (result.length === 1) {
                sendVerificationEmail(result[0].email, verificationCode);
                return res
                  .status(200)
                  .send({ message: "Verification code sent" });
              }
            }
          );
        } else {
          return res.status(400).send({ message: "User does not exist" });
        }
      });
    } else {
      return res.status(400).send({ message: "Invalid user type" });
    }
  } catch (error) {
    console.error("Error in resendVerificationToken", error.message);
    return res.status(500).send({ message: "Internal server error" });
  }
};

//forgotPassword API
export const forgotPassword = async (req, res) => {};

//resetPassword API
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
