import sequelize from '../config/db.js';
import User from './User.js';
import Company from './Company.js';
import Job from './Job.js';
import Application from './Application.js';

// Sync all models
await sequelize.sync({ force: false })
  .then(() => console.log("Database & tables created!"))
  .catch(error => console.log('Error syncing database:', error));

export { User, Company, Job, Application };
