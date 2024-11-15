import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  full_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phone_num: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  gender: { type: DataTypes.ENUM('Male', 'Female', 'Other') },
  cv: { type: DataTypes.STRING },
  profile_pic: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: false },
  verificationCode: { type: DataTypes.STRING },
  verificationExpiration: { type: DataTypes.DATE },
  isVerified: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.INTEGER }
});

export default User;
