"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class RequestHistory extends Model {
        static associate({Request}) {
            this.belongsTo(Request, {
                foreignKey: "requestId",
                as: "request"
            })
        }
    };
    RequestHistory.init({
        requestId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "RequestHistory",
        tableName: "request_history"
    });
    return RequestHistory;
};