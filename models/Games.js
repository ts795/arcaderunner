const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Games extends Model {}

Games.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      // Set size so the description can be a couple of paragraphs long if needed
      type: DataTypes.STRING(4096),
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "games",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Games;
