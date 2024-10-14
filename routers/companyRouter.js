import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  deleteCompany,
  getCompany,
  getCompanies,
  updateCompany,
} from "../controllers/companyController.js";

const router = express.Router();

//test API
router.get("/test", authMiddleware, (req, res) => {
  res.send("Company route test API");
});

// Update company
router.put("/update", authMiddleware, updateCompany);

// Delete company
router.delete("/delete", authMiddleware, deleteCompany);

// Get company
router.get("/:id", authMiddleware, getCompany);

// Get all companies
router.get("/all", authMiddleware, getCompanies);

export default router;