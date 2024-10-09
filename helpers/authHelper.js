import db from "../configs/db.js";

export const existsUser = async (email, res) => {
  try {
    const connect = await db();
    const checkUserQuery = `SELECT * FROM users WHERE email = ?`;

    return new Promise((resolve, reject) => {
      connect.query(checkUserQuery, [email], (error, result) => {
        if (error) {
          console.error("Error in existsUser: ", error.message);
          return reject(new Error("Internal server error"));
        }
        return resolve(result.length > 0);
      });
    });
  } catch (error) {
    console.error("Error in existsUser: ", error).message;
    return res.status(500).json({ message: "Internal server error" });
  }
};
