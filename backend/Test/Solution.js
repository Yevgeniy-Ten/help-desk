"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Solution extends Model {
        static associate({Topic}) {
            // this.hasMany(Topic, {
            //     foreignKey: "topicId"
            // })
        }
    };
    Solution.init({
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.INTEGER,
        },
        description: DataTypes.STRING,
        videoPath: DataTypes.STRING
    }, {
        sequelize,
        modelName: "Solution",
        tableName: "solutions"
    });
    return Solution;
};