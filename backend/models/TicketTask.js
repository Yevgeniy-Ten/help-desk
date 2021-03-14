"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TicketTask extends Model {
        static associate({User, Ticket}) {
            this.belongsTo(User, {
                foreignKey: "employeeId",
                as: "employee"
            })
            this.belongsTo(Ticket, {
                foreignKey: "ticketId",
                as: "ticket"
            })
        }
    };
    TicketTask.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("notStarted", "started", "finished"),
            allowNull: false,
        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ticketId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "TicketTask",
        tableName: "ticket_tasks"
    });
    return TicketTask;
};