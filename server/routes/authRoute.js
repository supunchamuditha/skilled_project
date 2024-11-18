import express from "express";
import {
  registerCompany,
  registerUser,
} from "../controllers/authController.js";
import { uploadLogo, uploadPPCV } from "../controllers/uploadController.js";
import { userValidation } from "../validation/userValidation.js";

const router = express.Router();

// Register a new user
router.post("/user", uploadPPCV, userValidation, registerUser);

// Register a new company
router.post("/company", uploadLogo, registerCompany);

export default router;
