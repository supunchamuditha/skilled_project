import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

//test API
router.get("/test", authMiddleware, (req, res) => {
  res.send("Post route test API");
});

// Update post
router.put("/update", authMiddleware, updatePost);

// Delete post
router.delete("/delete", authMiddleware, deletePost);

// Get post
router.get("/:id", authMiddleware, getPost);

// Get all posts
router.get("/", authMiddleware, getPosts);

export default router;
