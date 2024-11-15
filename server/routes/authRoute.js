import express from "express";
import { registerUser } from "../controllers/authController.js";
import { uploadPPCV } from "../controllers/uploadController.js";
import { userValidation } from "../validation/userValidation.js";

const router = express.Router();

// Register a new user
router.post("/user", uploadPPCV, userValidation, registerUser);

export default router;
