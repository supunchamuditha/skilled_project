import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Company from './Company.js';
import Job from './Job.js';

const Application = sequelize.define('Application', {
  message: { type: DataTypes.TEXT },
  attachment: { type: DataTypes.STRING },
  date_applied: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.INTEGER }
});

Application.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Application.belongsTo(Company, { foreignKey: 'company_id', onDelete: 'CASCADE' });
Application.belongsTo(Job, { foreignKey: 'job_id', onDelete: 'CASCADE' });

export default Application;
