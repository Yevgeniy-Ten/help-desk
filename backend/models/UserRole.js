"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserRole extends Model {
        static associate({User}) {
            this.belongsTo(User, {
                foreignKey: "userId",
                as: "user"
            })
        }

        toJSON() {
            return {
                ...this.get(),
                accessAppeals: this.accessAppeals.split(","),
                accessTickets: this.accessTickets.split(","),
                accessUsers: this.accessUsers.split(",")
            }
        }
    };
    UserRole.init({
        name: {
            type: DataTypes.ENUM("moderator", "client", "employee"),
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        accessAppeals: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "get,update,delete"
        },
        accessUsers: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "get,update,delete"
        },
        accessTickets: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "get,update,delete",
        }

    }, {
        sequelize,
        modelName: "UserRole",
        tableName: "user_roles"
    });
    return UserRole;
};