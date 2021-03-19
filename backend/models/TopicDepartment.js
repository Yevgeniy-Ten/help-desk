"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TopicDepartment extends Model {
        static associate({ Topic, User }) {
            this.hasMany(Topic, {
                foreignKey: "departmentId",
                as: "topics"
            })
            this.hasMany(User, {
                foreignKey: "departmentId",
                as: "employees"
            })
        }
    };
    TopicDepartment.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: "TopicDepartment",
        tableName: "topic_department"
    });
    return TopicDepartment;
};