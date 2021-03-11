"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Appeal extends Model {

        static associate({User, Ticket, Topic}) {
            // принадлежит к юзеру, связывается через userId
            this.belongsTo(User, {
                foreignKey: "userId",
                as: "user"
            })
            // принадлежит тикету, связывается через ticketId
            this.belongsTo(Ticket, {
                foreignKey: "ticketId",
                as: "ticket"
            })
            // принадлежит к тематике связывается через topicId
            this.belongsTo(Topic, {
                foreignKey: "topicId",
                as: "topic"
            })
        }
    };
    Appeal.init({
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ticketId: DataTypes.INTEGER,
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            allowNull: false,
            type: DataTypes.ENUM("notStarted", "started", "finished"),
            defaultValue: "notStarted"
        }
    }, {
        sequelize,
        modelName: "Appeal",
        tableName: "appeals",
    });
    return Appeal;
};