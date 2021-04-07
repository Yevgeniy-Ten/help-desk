"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
        static associate({ Reglaments, User }) {
            this.hasMany(Reglaments, {
                foreignKey: "copmanyId",
                as: "copmanyRules"
            });
            // имеет много юзерув, связывается через userId
            this.hasMany(User, {
                foreignKey: "companyId",
                as: "employees"
            });
        }
    };
    Company.init({
        title: DataTypes.STRING,
        // description:DataTypes.STRING,
    }, {
        timestamps: false,
        sequelize,
        modelName: "Company",
        tableName: "company",
    });
    return Company;
};