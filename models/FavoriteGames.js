const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class FavoriteGames extends Model { }

FavoriteGames.init(
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

        game_id: {
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
        modelName: "favoriteGames",
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = FavoriteGames;
