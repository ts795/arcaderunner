const sequelize = require('../config/connection');
const gamesData = require('./gameData.json');
const { Games } = require('../models');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    // Load games for testing
    await Games.bulkCreate(gamesData);
    process.exit(0);
};

seedAll();