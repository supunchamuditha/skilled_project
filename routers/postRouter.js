import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadImage } from "../controllers/imageController.js";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

// Test API
router.get("/test", authMiddleware, (req, res) => {
  res.send("Post route test API");
});

// Create post with image upload
router.post("/create", authMiddleware, uploadImage, createPost);

// Update post
router.put("/update", authMiddleware, updatePost);

// Delete post
router.delete("/delete", authMiddleware, deletePost);

// Get post
router.get("/:id", authMiddleware, getPost);

// Get all posts
router.get("/", authMiddleware, getPosts);

export default router;
