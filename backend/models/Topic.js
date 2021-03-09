"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Topic extends Model {
        static associate({Ticket, Solution, Department, User}) {
            // тематика имеет монго тикетов
            this.hasMany(Ticket, {
                foreignKey: "topicId",
                as: "tickets"
            })
            // тематика имеет много решений
            this.hasMany(Solution, {
                foreignKey: "solutionId"
            })
            // принадлежит к юзеру через отдел
            // this.belongsToMany(User, {
            //     through: Department
            // })
        }
    };
    Topic.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: "Topic",
        tableName: "topics"
    });
    return Topic;
};