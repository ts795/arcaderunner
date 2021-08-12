const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Friends extends Model {}

Friends.init(
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

    friend_id: {
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
    modelName: "friends",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Friends;
