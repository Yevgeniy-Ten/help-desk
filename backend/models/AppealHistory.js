"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class AppealHistory extends Model {
        static associate() {

        }
    };
    AppealHistory.init({
        isShowed: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: "AppealHistory",
        tableName: "appeal_history"
    });
    return AppealHistory;
};