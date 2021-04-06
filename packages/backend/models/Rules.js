"use strict";
const {
    Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Rules extends Model {
        static associate({ Company, Topic, Department }) {
            this.belongsTo(Company, {
                foreignKey: "copmanyId",
                as: "copmanyRules"
            })
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
        copmanyId: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        priority: {
            type: DataTypes.ENUM("Срочно", "Средний", "Стандартно", "Критично"),
            defaultValue: "Стандартно",
            allowNull: false
        },
        topicId: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deadline: {
            type: DataTypes.INTEGER,
            // type: DataTypes.DATE,
            // defaultValue: Date.now(),
            defaultValue: 0,
            // allowNull: false
        },
        departmentId: {
            type: DataTypes.INTEGER,
            // defaultValue: null,
        },
    }, {
        timestamps: false,
        sequelize,
        modelName: "Rules",
        tableName: "rules",
    });
    return Rules;
};