"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserRole extends Model {
        static associate({ User }) {
            this.hasMany(User, {
                foreignKey: "roleId",
                as: "users"
            })

            // почему бы у роли не сделать this.hasMany
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
            type: DataTypes.ENUM("Срочно", "Средний", "Стандартно", "Инцидент"),
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
        timestamps: false,
        modelName: "UserRole",
        tableName: "user_roles"
    });
    return UserRole;
};