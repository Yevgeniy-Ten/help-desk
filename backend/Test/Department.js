"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Department extends Model {

        static associate({Topic, User}) {
            // имеет запись вида сотрдудник тематика услуги
            // this.hasMany(Topic, {
            //     foreignKey: "topicId"
            // })
            // this.hasMany(User, {
            //     foreignKey: "employeeId"
            // })
        }
    };
    Department.init({
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Department",
    });
    return Department;
};