const User = require("./User");
// const Friends = require('./Friends');
const Message = require("./Message");
const Games = require("./Games");
const Highscores = require("./Highscores");

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

Games.hasMany(Highscores, {
  foreignKey: "game_id",
});

Message.belongsTo(User, {
  foreignKey: "user_id",
});

Highscores.belongsTo(User, {
  foreignKey: "user_id",
});

Highscores.belongsTo(Games, {
  foreignKey: "game_id",
});

module.exports = { User, Message, Games, Highscores };
