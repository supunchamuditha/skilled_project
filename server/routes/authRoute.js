import express from "express";
import {
  companyLogin,
  loginUser,
  registerCompany,
  registerUser,
  resendCompanyOTP,
  resendUserOTP,
  verifyCompany,
  verifyUser,
} from "../controllers/authController.js";
import { uploadLogo, uploadPPCV } from "../controllers/uploadController.js";
import { userValidation } from "../validation/userValidation.js";
import { companyValidation } from "../validation/companyValidation.js";
import { loginValidation } from "../validation/authValidation.js";

const router = express.Router();

// Register a new user
router.post("/user", uploadPPCV, userValidation, registerUser);

// Register a new company
router.post("/company", uploadLogo, companyValidation, registerCompany);

// Login a user
router.post("/user/login", loginValidation, loginUser);

// Login a company
router.post("/company/login", loginValidation, companyLogin);

// Verify a user's account
router.put("/user/verify/", verifyUser);

// Verify a company's account
router.put("/company/verify/", verifyCompany);

// Resend verification email
router.post("/user/verify/resend", resendUserOTP);

// Resend verification email
router.post("/company/verify/resend", resendCompanyOTP);

export default router;
