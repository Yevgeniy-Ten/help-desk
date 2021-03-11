"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Topic extends Model {
        static associate({Ticket, Appeal}) {
            // тематика имеет много тикетов открытых по этой тематике
            this.hasMany(Ticket, {
                foreignKey: "topicId",
                as: "tickets"
            })
            // тематика имеет много обращений открытых по этой тематике
            this.hasMany(Appeal, {
                foreignKey: "topicId",
                as: "appeals"
            })
        }
    };
    Topic.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: "Topic",
        tableName: "topics"
    });
    return Topic;
};