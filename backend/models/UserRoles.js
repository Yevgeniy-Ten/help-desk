"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserRoles extends Model {
        static associate() {
            // this.hasMany(User, {
            //     foreignKey: "roleId",
            //     as: "users"
            // })
        }
    };
    // требуется создать сущность Роли, и связать Роли и Юзеров в одной таблице UserRoles связь многие ко многим
    UserRoles.init({
        name: {
            type: DataTypes.ENUM("admin", "client", "employee"),
            allowNull: false
        },
    }, {
        sequelize,
        modelName: "UserRole",
        tableName: "user_roles"
    });
    return UserRoles;
};