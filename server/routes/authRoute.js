import express from "express";
import {
  loginUser,
  registerCompany,
  registerUser,
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

export default router;
