const User = require("./User");
// const Friends = require('./Friends');
const Message = require("./Message");
const Games = require("./Games");
const Highscores = require("./Highscores");
const FavoriteGames = require("./FavoriteGames")

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

User.belongsTo(FavoriteGames, {
  foreignKey: "user_id",
})

FavoriteGames.hasMany(User, {
  foreignKey: "user_id",
});

FavoriteGames.hasMany(Games, {
  foreignKey: "game_id",
});

Games.hasMany(Highscores, {
  foreignKey: "game_id",
});

Games.belongsTo(FavoriteGames, {
  foreignKey: "game_id",
})

Message.belongsTo(User, {
  foreignKey: "user_id",
});

Highscores.belongsTo(User, {
  foreignKey: "user_id",
});

Highscores.belongsTo(Games, {
  foreignKey: "game_id",
});

module.exports = { User, Message, Games, Highscores, FavoriteGames };
