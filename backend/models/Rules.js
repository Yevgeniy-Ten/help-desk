"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Rules extends Model {
        static associate({ Topic, Department }) {
            // принадлежит к отделу связывается через topicId
            this.belongsTo(Department, {
                foreignKey: "departmentId",
                as: "departmentRules"
            })
            // принадлежит к тематике связывается через topicId
            this.belongsTo(Topic, {
                foreignKey: "topicId",
                as: "topicRules"
            })
        }
    };
    Rules.init({
        topicId: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deadline: {
            type: DataTypes.DATE,
            defaultValue: Date.now(),
            allowNull: false
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: false,
        sequelize,
        modelName: "Rules",
        tableName: "rules",
    });
    return Rules;
};