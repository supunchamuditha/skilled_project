import jwt from "jsonwebtoken";
import connectDB from "../config/db.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const { id, role, status } = decoded;

    const connection = await connectDB();
    const query = `SELECT id FROM users WHERE id = ?`;

    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error("Database query error:", err.message);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.length === 0) {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid Token" });
      }

      req.userid = id;
      req.userrole = role;
      req.userstatus = status;
      next();
    });
  } catch (error) {
    console.error("Error in authMiddleware:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;
