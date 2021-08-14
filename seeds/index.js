const sequelize = require('../config/connection');
const gamesData = require('./gameData.json');
const userData = require('./userData.json');
const highscoresData = require('./highscoresData.json');
const { User, Games, Highscores } = require('../models');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    // Load games for testing
    await Games.bulkCreate(gamesData);

    // Load users for testing
    await User.bulkCreate(userData);

    // Load Highscores for testing
    await Highscores.bulkCreate(highscoresData);

    process.exit(0);
};

seedAll();