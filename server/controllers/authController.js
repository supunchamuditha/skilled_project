import { where } from "sequelize";
import { validationResult } from "express-validator";

import { User, Company } from "../models/index.js";
// import Company from "../models/Company.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import generateToken from "../utils/generateToken.js";
import generateOTP from "../utils/generateOTP.js";
import sendOTP from "../utils/sendOTP.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

// Store OTPs in memory
const otpStore = {};

// Register a new user
export const registerUser = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Group errors by field
      const groupedErrors = errors.array().reduce((acc, error) => {
        const param = error.path || "unknown";
        if (!acc[param]) {
          acc[param] = [];
        }
        acc[param].push(error.msg);
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: groupedErrors,
      });
    }

    // Extract user details from request body
    const { full_name, email, password, phone_num, location, gender } =
      req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash the password
    const hashedPassword = await hashPassword(password);

    // Access uploaded profile picture
    const profilePic = req.files["profile_pic"][0].buffer; // Access uploaded profile picture
    const profilePicType = req.files["profile_pic"][0].mimetype;

    // Access uploaded CV
    const cv = req.files["cv"][0].buffer; // Access uploaded CV
    const cvType = req.files["cv"][0].mimetype;

    // Generate OTP
    const otp = generateOTP();

    // Store the OTP in memory
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    // Send OTP SMS to the user
    await sendOTP(phone_num, otp);

    // Send OTP email to the user
    sendVerificationEmail(email, otp);

    // Create a new user
    const newuser = await User.create({
      full_name,
      email,
      password: hashedPassword,
      phone_num,
      location,
      gender,
      cv: cv,
      cv_type: cvType,
      profile_pic: profilePic,
      profile_pic_type: profilePicType,
      isVerified: "false",
      status: 1,
    });

    //Remove the password field from the user object before sending
    const userResponse = { ...newuser.toJSON() };
    delete userResponse.password;

    // Generate a token for the user
    const data = { id: userResponse.id };
    generateToken(data, res);

    // Return the user object
    return res
      .status(201)
      .json({ message: "User created successfully", user: userResponse });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Register a new company
export const registerCompany = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Group errors by field
      const groupedErrors = errors.array().reduce((acc, error) => {
        const param = error.path || "unknown";
        if (!acc[param]) {
          acc[param] = [];
        }
        acc[param].push(error.msg);
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: groupedErrors,
      });
    }

    //Extract company details from request body
    const { name, email, phone_num, location, industry, password } = req.body;

    // Check if the company already exists
    const existingCompany = await Company.findOne({ where: { email } });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Access uploaded logo
    const logo = req.file.buffer;
    const logoType = req.file.mimetype;

    // Generate OTP
    const otp = generateOTP();

    // Store the OTP in memory
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    // Send OTP SMS to the company
    await sendOTP(phone_num, otp);

    // Send OTP email to the company
    sendVerificationEmail(email, otp);

    // Create a new company
    const newCompany = await Company.create({
      name,
      email,
      location,
      phone_num,
      industry,
      logo: logo,
      logo_type: logoType,
      password: hashedPassword,
      isVerified: "false",
      status: 1,
    });

    // Remove the password field from the company object before sending
    const companyResponse = { ...newCompany.toJSON() };
    delete companyResponse.password;

    // Generate a token for the company
    const data = { id: companyResponse.id };
    generateToken(data, res);

    // Return the company object
    return res.status(201).json({
      message: "Company created successfully",
      company: companyResponse,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const groupedErrors = errors.array().reduce((acc, errors) => {
        const param = errors.path || "unknown";
        if (!acc[param]) {
          acc[param] = [];
        }
        acc[param].push(errors.msg);
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: groupedErrors,
      });
    }

    // Extract user details from request body
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let message = "Account verified, login successful";

    // Check if the user's account is verified
    if (user.isVerified === "false") {
      message = "Account not verified";
    }

    // Compare the password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token for the user
    const data = { id: user.id };
    generateToken(data, res);

    // Remove the password field from the user object before sending
    const userResponse = { ...user.toJSON() };
    delete userResponse.password;

    // Return the user object
    return res.status(200).json({ message, user: userResponse });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login a company
export const companyLogin = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const groupedErrors = errors.array().reduce((acc, error) => {
        const param = error.path || "unknown";
        if (!acc[param]) {
          acc[param] = [];
        }
        acc[param].push(error.msg);
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: groupedErrors,
      });
    }

    // Extract company details from request body
    const { email, password } = req.body;

    // Check if the company exists
    const company = await Company.findOne({ where: { email } });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    let message = "Account verified, login successful";

    // Check if the company's account is verified
    if (company.isVerified === "false") {
      message = "Account not verified";
    }

    // Compare the password
    const isMatch = await comparePassword(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token for the company
    const data = { id: company.id };
    generateToken(data, res);

    // Remove the password field from the company object before sending
    const companyResponse = { ...company.toJSON() };
    delete companyResponse.password;

    // Return the company object
    return res.status(200).json({ message, company: companyResponse });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Verify a user account
export const verifyUser = async (req, res) => {
  try {
    // Extract email and OTP from request body
    const { email, otp } = req.body;

    // Check if the OTP is valid
    if (!otpStore[email] || otpStore[email].otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if the OTP has expired
    if (Date.now() > otpStore[email].expiresAt) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Update the user's account verification status
    await User.update({ isVerified: "true" }, { where: { email } });

    // Return a success message
    return res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Verify a company account
export const verifyCompany = async (req, res) => {
  try {
    // Extract email and OTP from request body
    const { email, otp } = req.body;

    // Check if the OTP is valid
    if (!otpStore[email] || otpStore[email].otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if the OTP has expired
    if (Date.now() > otpStore[email].expiresAt) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Update the company's account verification status
    await Company.update({ isVerified: "true" }, { where: { email } });

    // Return a success message
    return res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Resend OTP to a user
export const resendUserOTP = async (req, res) => {
  try {
    // Extract email from request body
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store the OTP in memory
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    // Send OTP SMS to the user
    await sendOTP(user.phone_num, otp);

    // Send OTP email to the user
    sendVerificationEmail(email, otp);

    // Return a success message
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Resend OTP to a company
export const resendCompanyOTP = async (req, res) => {
  try {
    // Extract email from request body
    const { email } = req.body;

    // Check if the company exists
    const company = await Company.findOne({ where: { email } });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store the OTP in memory
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    // Send OTP SMS to the company
    await sendOTP(company.phone_num, otp);

    // Send OTP email to the company
    sendVerificationEmail(email, otp);

    // Return a success message
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Logout a user or company
export const logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");

    // Return a success message
    return res
      .status(200)
      .json({ message: "User or company logged out successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
