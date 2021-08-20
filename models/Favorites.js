const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Favorites extends Model {}

Favorites.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },

    games_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "games",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "favorites",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Favorites;
