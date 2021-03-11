"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Topic extends Model {
        static associate({Ticket, Appeal, Solution, User}) {
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
            // одна тематика имеет много решений
            this.hasMany(Solution, {
                foreignKey: "topicId",
                as: "solutions"
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