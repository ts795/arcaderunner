const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Sender of the message
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },

    // Receiver of the message
    receiver_id: {
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
    modelName: "message",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Message;
