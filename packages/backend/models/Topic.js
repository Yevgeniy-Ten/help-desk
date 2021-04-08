"use strict";
const {
    Model
} = require("sequelize");

//  ТЕМАТИКА 
//  Общая организация проекта
//  Бухгалтерия
//  Техническая поддержка
//  Отчетность
module.exports = (sequelize, DataTypes) => {
    class Topic extends Model {
        static associate({ Request, Solution, Department, Reglaments, ServicesTopic }) {
            // одна тематика имеет много заявок открытых по этой тематике
            this.hasMany(Request, {
                foreignKey: "topicId",
                as: "topicRequets"
            })
            // одна тематике принадлежит к отделу который предоставляет услуги по этой тематике
            // this.hasMany(Department, {
            //     foreignKey: "topicId",
            //     as: "department"
            // })
            this.hasMany(Reglaments, {
                foreignKey: "topicId",
                as: "rules"
            })
            // одна тематика имеет много решений
            this.hasMany(Solution, {
                foreignKey: "topicId",
                as: "solutions"
            })
            // одна тематика имеет много услуг
            // this.hasMany(ServicesTopic, {
            //     foreignKey: "topicId",
            //     as: "services"
            // })
        }
    };
    Topic.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false,
        sequelize,
        modelName: "Topic",
        tableName: "topics"
    });
    return Topic;
};