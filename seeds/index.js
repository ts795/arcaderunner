const sequelize = require('../config/connection');
const seedUsers = require('./userData');


const seedAll = async () => {
    await sequelize.sync({ force: true });

    // Load user data for testing
    await seedUsers();

    process.exit(0);
};

seedAll();