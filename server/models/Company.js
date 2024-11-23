import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Company = sequelize.define(
  "Company",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    location: { type: DataTypes.STRING },
    phone_num: { type: DataTypes.STRING },
    industry: { type: DataTypes.STRING },
    logo: { type: DataTypes.STRING },
    logo_type: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
    isVerified: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
  }
);

export default Company;
