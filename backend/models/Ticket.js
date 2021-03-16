"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Ticket extends Model {
        static associate({Appeal, Topic, ServicesTopic, TicketHistory, TicketTask}) {
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
            // тикет будет иметь куча историй
            this.hasMany(TicketHistory, {
                foreignKey: "ticketId",
                as: "ticketHistory"
            })
            // тикет может иметь куча задач открытых по этому тикеты
            this.hasMany(TicketTask, {
                foreignKey: "ticketId",
                as: "tasks"
            })
        }
    };
    Ticket.init({
        type: {
            type: DataTypes.ENUM("request", "incident"),
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
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        serviceTopicId: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: "Ticket",
        tableName: "tickets"
    });
    return Ticket;
};