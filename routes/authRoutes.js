import express from "express";

import {
  createUser_admin,
  createUser_candidate,
  createUser_recruiter,
  loginUser,
} from "../controllers/authController.js";
import {
  loginValidationRules,
  userValidationRules,
} from "../utils/userValidation.js";

const router = express.Router();

//Create a new user
router.post("/createadmin", userValidationRules, createUser_admin);
router.post("/createrecruiter", userValidationRules, createUser_recruiter);
router.post("/createcadnidate", userValidationRules, createUser_candidate);

//Login user
router.post("/login", loginValidationRules, loginUser);

export default router;
