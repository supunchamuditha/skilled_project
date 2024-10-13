import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.userId = decoded.id;
    req.userType = decoded.userType;
    next();
  } catch (error) {
    console.error("Error in authMiddleware", error.message);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export default authMiddleware;