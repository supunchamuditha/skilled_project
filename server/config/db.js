import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",

    //Customize logging: log only errors or specific messages
    logging: (msg) => {
      if (msg.startsWith("Executing")) {
        // Suppress SQL query logs
        return;
      }
      console.log(msg); // Log everything else
    },
  }
);

export default sequelize;
