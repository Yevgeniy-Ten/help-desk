"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TopicDepartment extends Model {
        static associate() {

        }
    };
    TopicDepartment.init({}, {
        sequelize,
        modelName: "TopicDepartment",
        tableName: "topic_department"
    });
    return TopicDepartment;
};