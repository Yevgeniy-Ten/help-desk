"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Request extends Model {
        static associate({ User, Topic, RequestHistory }) {
            // принадлежит к юзеру, связывается через userId
            this.belongsTo(User, {
                foreignKey: "clientId",
                as: "clientRequest"
            })
            this.belongsTo(User, {
                foreignKey: "employeeId",
                as: "employeeRequest"
            })
            // 
            this.hasMany(RequestHistory, {
                foreignKey: "requestId",
                as: "requestHistory"
            })
            // принадлежит к тематике связывается через topicId
            this.belongsTo(Topic, {
                foreignKey: "topicId",
                as: "topic"
            })
        }
    };
    Request.init({
        clientId: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        employeeId: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        priority: {
            type: DataTypes.ENUM("Срочно", "Средний", "Стандартно", "Инцидент"),
            defaultValue: "Стандартно",
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("Открыто", "В процессе", "Выполнено"),
            defaultValue: "Открыто",
            allowNull: false
        },
        deadline: {
            type: DataTypes.DATE,
            defaultValue: Date.now(),
            allowNull: false
        },
        hourWork: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: false,
        sequelize,
        modelName: "Request",
        tableName: "request",
    });
    return Request;
};