import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = async () => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log(`Connected to the database`);

    return connection;
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    throw new Error("Failed to connect to the database");
  }
};

export default db;
