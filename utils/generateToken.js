import jwt from "jsonwebtoken";

const generateToken = (data, res) => {
  // The payload should be an object
  const payload = {
    id: data.id,
    role: data.role,
    status: data.status,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });

  res.cookie("token", token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

export default generateToken;
