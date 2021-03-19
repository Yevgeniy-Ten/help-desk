"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
        static associate({ User }) {
            // имеет много юзерув, связывается через userId
            this.hasMany(User, {
                foreignKey: "userId",
                as: "user"
            });
        }
    };
    Company.init({
        name: DataTypes.STRING,
        // description:DataTypes.STRING,
    }, {
        timestamps: false,
        sequelize,
        modelName: "Company",
        tableName: "company",
    });
    return Company;
};