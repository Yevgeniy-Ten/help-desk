"use strict";
const {
    Model
} = require("sequelize");
//  Отделы
//  Бухгалтерия
//  Техническая поддержка
module.exports = (sequelize, DataTypes) => {
    class Department extends Model {
        static associate({ Reglaments, User, Request, OrgStructure }) {
            this.hasMany(Reglaments, {
                foreignKey: "departmentId",
                as: "rules"
            });
            // много работников в отделе
            // this.hasMany(User, {
            //     foreignKey: "departmentId",
            //     as: "employeesDepartment"
            // })
            this.hasMany(Request, {
                foreignKey: "departmentId",
                as: "departmentRequest"
            })
            this.hasMany(OrgStructure, {
                foreignKey: "departmentId",
                as: "orgStreDepId"
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