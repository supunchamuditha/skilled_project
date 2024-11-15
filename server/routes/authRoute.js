import express from "express";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

// Register a new user
router.post("/user", registerUser);

export default router;
