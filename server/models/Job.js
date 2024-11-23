import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Company from './Company.js';

const Job = sequelize.define('Job', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  location: { type: DataTypes.STRING },
  job_type: { type: DataTypes.ENUM('Full-Time', 'Part-Time', 'Contract', 'Internship', 'Temporary') },
  position: { type: DataTypes.STRING },
  salary: { type: DataTypes.DECIMAL(15, 2) },
  date_posted: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.INTEGER }
});

Job.belongsTo(Company, { foreignKey: 'company_id', onDelete: 'SET NULL' });

export default Job;
