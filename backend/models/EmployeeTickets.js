"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class EmployeeTasks extends Model {

        static associate({User, Ticket}) {
            this.hasMany(User, {
                foreignKey: "employeeId"
            })
            this.hasMany(Ticket, {
                foreignKey: "ticketId"
            })
        }
    };
    EmployeeTasks.init({
        ticketId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "EmployeeTasks",
    });
    return EmployeeTasks;
};