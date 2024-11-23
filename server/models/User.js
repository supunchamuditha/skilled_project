import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    full_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone_num: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    gender: { type: DataTypes.ENUM("Male", "Female", "Other") },
    cv: { type: DataTypes.STRING },
    cv_type: { type: DataTypes.STRING },
    profile_pic: { type: DataTypes.STRING },
    profile_pic_type: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
    isVerified: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
  }
);

export default User;
