import mysql from "mysql2"; // Using promise version
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
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

    // You can now use the connection for queries
    return connection;
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    // Handle or rethrow the error
    throw new Error("Failed to connect to the database");
  }
};

export default connectDB;
