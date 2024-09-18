import connectDB from "../config/db.js";

const connection = await connectDB();

export const createUser = async (req, res) => {
  const { name, email, phone, password, profile_picture } = req.body;

  try {
    const createUserQuery = `INSERT INTO users (name, email, phone, password, profile_picture, otp, role, date, status, otpExpiration, isVerified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(
      createUserQuery,
      [
        name,
        email,
        phone,
        password,
        profile_picture,
        0,
        "admin",
        new Date(),
        2,
        new Date(),
        "false",
      ],
      (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ message: "Internal server error" });
        }

        return res.status(201).json({
          message: "Account created successfully",
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const checkAuthQuery = `SELECT * FROM users WHERE email = ? AND password = ?`;

  const { email, password } = req.body;

  connection.query(checkAuthQuery, [email, password], (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User found",
      data: result,
    });
  });
};
