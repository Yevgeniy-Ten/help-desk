"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Ticket extends Model {
        static associate({Appeal, Topic, ServicesTopic}) {
            // имеет много обращений, связывать по ключу ticketId
            this.hasMany(Appeal, {
                foreignKey: "ticketId",
                as: "appeals"
            })
            // приднадлежит к тематике связывается через topicId
            this.belongsTo(Topic, {
                foreignKey: "topicId",
                as: "topic",
            })

            // принадлежит к определенной услуге,
            this.belongsTo(ServicesTopic, {
                foreignKey: "serviceTopicId",
                as: "servicesTopics"
            })
        }
    };
    Ticket.init({
        type: {
            type: DataTypes.ENUM("request", "incident"),
            allowNull: false
        },
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        priority: {
            type: DataTypes.ENUM("low", "high", "medium"),
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
        status: DataTypes.STRING,
        deadline: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
            allowNull: false
        },
        hourWork: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        serviceTopicId: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: "Ticket",
        tableName: "tickets"
    });
    return Ticket;
};