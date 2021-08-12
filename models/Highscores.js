const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Highscores extends Model {}

Highscores.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "games",
        key: "id",
      },
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "highscores",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Highscores;
