import express from "express";

import { createCompany } from "../controllers/companyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { companyValidationRules } from "../utils/companyValidation.js";

const router = express.Router();

//Test the API
router.get("/", (req, res) => {
  res.send("Company API");
});

//Create a company
router.post("/create", authMiddleware, companyValidationRules, createCompany);

export default router;
