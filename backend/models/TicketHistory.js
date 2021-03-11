"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TicketHistory extends Model {
        static associate() {

        }
    };
    TicketHistory.init({
        isShowed: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: "TicketHistory",
        tableName: "ticket_history"
    });
    return TicketHistory;
};