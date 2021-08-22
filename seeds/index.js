const sequelize = require('../config/connection');
const gamesData = require('./gameData.json');
const userData = require('./userData.json');
const highscoresData = require('./highscoresData.json');
const messagesData = require('./messageData.json');
const favoritesData = require('./favorites.json');

const { User, Games, Highscores, Message, Favorites } = require('../models');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    // Load games for testing
    await Games.bulkCreate(gamesData);

    // Load users for testing
    await User.bulkCreate(userData);

    // Load Highscores for testing
    await Highscores.bulkCreate(highscoresData);

    // Load messages for testing
    await Message.bulkCreate(messagesData);

    //Load favorites for testing
    await Favorites.bulkCreate(favoritesData);


    process.exit(0);
};

seedAll();