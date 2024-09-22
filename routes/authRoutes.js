import express from "express";

import {
  createUser_admin,
  createUser_candidate,
  createUser_recruiter,
  loginUser,
  updateVerifyCode,
  verifyUser,
} from "../controllers/authController.js";
import {
  loginValidationRules,
  userValidationRules,
} from "../utils/userValidation.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//Create a new user
router.post("/createadmin", userValidationRules, createUser_admin);
router.post("/createrecruiter", userValidationRules, createUser_recruiter);
router.post("/createcadnidate", userValidationRules, createUser_candidate);

//Login user
router.post("/login", loginValidationRules, loginUser);

//verify user
router.post("/verify-code", authMiddleware, verifyUser);

//resend verification code
router.post("/resend-code", authMiddleware, updateVerifyCode);

export default router;
