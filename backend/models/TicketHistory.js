"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TicketHistory extends Model {
        static associate({Ticket}) {
            this.belongsTo(Ticket, {
                foreignKey: "ticketId"
            })
        }
    };
    TicketHistory.init({
        ticketId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "TicketHistory",
        tableName: "ticket_history"
    });
    return TicketHistory;
};