"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Ticket extends Model {
        static associate({Appeal, User, Topic, EmployeeTickets}) {
            this.belongsTo(Appeal, {
                foreignKey: "appealId"
            })
            // принадлежит Юзеру через ОтделЗадач
            // this.belongsToMany(User, {
            //     through: EmployeeTickets
            // })
            this.belongsTo(Topic, {
                foreignKey: "topicId"
            })
        }
    };
    Ticket.init({
        appealId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
        },
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: DataTypes.STRING,
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
    }, {
        sequelize,
        modelName: "Ticket",
        tableName: "tickets"
    });
    return Ticket;
};