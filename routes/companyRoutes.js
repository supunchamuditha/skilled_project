import express from "express";

import { createCompany, getAllCompanies, getCompany } from "../controllers/companyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { companyValidationRules } from "../utils/companyValidation.js";

const router = express.Router();

//Test the API
router.get("/", (req, res) => {
  res.send("Company API");
});

//Create a company
router.post("/create", authMiddleware, companyValidationRules, createCompany);

//Get a company
router.get("/get", authMiddleware, getCompany); 

//Get all companies
router.get("/all", authMiddleware, getAllCompanies);

export default router;
