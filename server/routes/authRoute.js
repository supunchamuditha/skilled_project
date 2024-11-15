import express from "express";
import { registerUser } from "../controllers/authController.js";
import { uploadPPCV } from "../controllers/uploadController.js";

const router = express.Router();

// Register a new user
router.post("/user", uploadPPCV, registerUser);

export default router;
