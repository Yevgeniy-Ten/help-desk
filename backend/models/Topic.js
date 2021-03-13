"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Topic extends Model {
        static associate({Ticket, Appeal, Solution, TopicDepartment, ServicesTopic}) {
            // одна тематика имеет много тикетов открытых по этой тематике
            this.hasMany(Ticket, {
                foreignKey: "topicId",
                as: "tickets"
            })
            // одна тематике принадлежит к отделу который предоставляет услуги по этой тематике
            this.belongsTo(TopicDepartment, {
                foreignKey: "departmentId",
                as: "department"
            })
            // одна тематика имеет много обращений открытых по этой тематике
            this.hasMany(Appeal, {
                foreignKey: "topicId",
                as: "appeals"
            })
            // одна тематика имеет много решений
            this.hasMany(Solution, {
                foreignKey: "topicId",
                as: "solutions"
            })
            // одна тематика имеет много услуг
            this.hasMany(ServicesTopic, {
                foreignKey: "topicId",
                as: "services"
            })
        }
    };
    Topic.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: true,
        sequelize,
        modelName: "Topic",
        tableName: "topics"
    });
    return Topic;
};