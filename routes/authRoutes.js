import express from "express";
import { createUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

//Create a new user
router.post("/create", createUser);

router.post("/login", loginUser);

export default router;
