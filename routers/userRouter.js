import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

//test API
router.get("/test", authMiddleware, (req, res) => {
  res.send("User route test API");
});

// Update user
router.put("/update", authMiddleware, updateUser);

// Delete user
router.delete("/delete", authMiddleware, deleteUser);

// Get user
router.get("/:id", authMiddleware, getUser);

// Get all users
router.get("/", authMiddleware, getUsers);

export default router;
