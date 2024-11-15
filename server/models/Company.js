import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Company = sequelize.define('Company', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  location: { type: DataTypes.STRING },
  phone_num: { type: DataTypes.STRING },
  industry: { type: DataTypes.STRING },
  logo: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: false },
  verificationCode: { type: DataTypes.STRING },
  verificationExpiration: { type: DataTypes.DATE },
  isVerified: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.INTEGER }
});

export default Company;
