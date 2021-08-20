const User = require("./User");
// const Friends = require('./Friends');
const Message = require("./Message");
const Games = require("./Games");
const Highscores = require("./Highscores");
const Favorites = require("./Favorites");

User.hasMany(Message, {
  foreignKey: "user_id",
});

User.hasMany(Highscores, {
  foreignKey: "user_id",
});

User.belongsToMany(User, {
  as: "Friends",
  through: "UserFriends",
});

//not sure which one to use: fasMany Favorites or belongsToMany Games
// documentation about favorites: https://stackoverflow.com/questions/53280738/join-in-sequelize/53288485
// User.hasMany(Favorites, {
//   foreignKey: "user_id",
// });

Games.belongsToMany(User, {
  as: "Favorites",
  through: "GameFavorites",
});

User.belongsToMany(Games, {
  as: "Favorites",
  through: "GameFavorites",
})

// Games.hasMany(Highscores, {
//   foreignKey: "game_id",
// });

// Message.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Highscores.belongsToMany(User, {
//   foreignKey: "user_id",
// });

// Highscores.belongsToMany(Games, {
//   foreignKey: "game_id",
// });

module.exports = { User, Message, Games, Highscores };
