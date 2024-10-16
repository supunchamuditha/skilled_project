import db from "../configs/db.js";

export const createPost = async (req, res) => {
  try {
    const { title, description, location, job_type, position, salary } =
      req.body;

    const image = req.file.buffer;
    const image_type = req.file.mimetype;

    const connect = await db();
    const userId = req.userId;
    const userType = req.userType;

    if (userType === "company") {
      const createPostQuery = `INSERT INTO job (title, description, location, job_type, position, salary, image, image_type, date_posted, status, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      connect.query(
        createPostQuery,
        [
          title,
          description,
          location,
          job_type,
          position,
          salary,
          image,
          image_type,
          new Date(),
          1,
          userId,
        ],
        (err, result) => {
          if (err) {
            console.error("Error in createPost: ", err.message);
            return res.status(500).json({ message: "Internal server error" });
          } else {
            return res
              .status(201)
              .json({ message: "Post created successfully" });
          }
        }
      );
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error in createPost: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Implement other functions (updatePost, deletePost, getPost, getPosts) as needed

export const updatePost = async (req, res) => {};

export const deletePost = async (req, res) => {};

export const getPost = async (req, res) => {};

export const getPosts = async (req, res) => {};
