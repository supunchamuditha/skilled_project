import db from "../configs/db.js";

// Update user
export const updateUser = async (req, res) => {};

// Delete user
export const deleteUser = async (req, res) => {};

// Get user
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const connect = await db();

    const getUsers = `SELECT full_name, email, phone_num, location , gender, cv, profile_pic FROM users WHERE id = ${id}`;

    connect.query(getUsers, (err, result) => {
      if (err) {
        console.error("Error in getUsers: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      return res.status(200).json({ users: result[0] });
    });
  } catch (error) {
    console.error("Error in getUser: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const connect = await db();
    const getUsers = `SELECT full_name, email, phone_num, location , gender, cv, profile_pic FROM users`;

    connect.query(getUsers, (err, result) => {
      if (err) {
        console.error("Error in getUsers: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      return res.status(200).json({ users: result });
    });
  } catch (error) {
    console.error("Error in getUsers: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
