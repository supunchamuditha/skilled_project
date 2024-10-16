import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createApplication,
  deleteApplication,
  getApplication,
  getApplications,
  updateApplication,
} from "../controllers/applicationController.js";
import { uploadPDF } from "../controllers/pdfController.js";

const router = express.Router();

// Test API
router.get("/test", authMiddleware, (req, res) => {
  res.send("Application route test API");
});

// Create application
router.post("/create/:id", authMiddleware, uploadPDF, createApplication);

// Update application
router.put("/update", authMiddleware, updateApplication);

// Delete application
router.delete("/delete", authMiddleware, deleteApplication);

// Get application
router.get("/:id", authMiddleware, getApplication);

// Get all applications
router.get("/", authMiddleware, getApplications);

export default router;
