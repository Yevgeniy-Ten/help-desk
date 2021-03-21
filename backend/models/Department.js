"use strict";
const {
    Model
} = require("sequelize");
//  Отделы
//  Бухгалтерия
//  Техническая поддержка
module.exports = (sequelize, DataTypes) => {
    class Department extends Model {
        static associate({ Rules, User }) {
            this.hasMany(Rules, {
                foreignKey: "departmentId",
                as: "rules"
            });
            // много работников в отделе
            this.hasMany(User, {
                foreignKey: "departmentId",
                as: "employeesDepartment"
            })
        }
    };
    Department.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: "Department",
        tableName: "department"
    });
    return Department;
};