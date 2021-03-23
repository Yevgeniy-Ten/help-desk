"use strict";
const {
    Model
} = require("sequelize");
//  Отделы
//  Бухгалтерия
//  Техническая поддержка
module.exports = (sequelize, DataTypes) => {
    class Department extends Model {
        static associate({ Rules, User, Request }) {
            this.hasMany(Rules, {
                foreignKey: "departmentId",
                as: "rules"
            });
            // много работников в отделе
            this.hasMany(User, {
                foreignKey: "departmentId",
                as: "employeesDepartment"
            })
            this.hasMany(Request, {
                foreignKey: "departmentId",
                as: "departmentRequest"
            })
        }
    };
    Department.init({
        title: {
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