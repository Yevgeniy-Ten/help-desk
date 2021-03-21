"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class RequestHistory extends Model {
        static associate({ Request }) {
            this.belongsTo(Request, {
                foreignKey: "requestId"
            })
        }
    };
    RequestHistory.init({
        requestId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: "RequestHistory",
        tableName: "request_history"
    });
    return RequestHistory;
};