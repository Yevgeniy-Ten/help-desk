"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ServicesTopic extends Model {
        static associate({Topic, Ticket, Appeal}) {
            this.belongsTo(Topic, {
                foreignKey: "topicId",
                as: "topic"
            })
            this.hasMany(Appeal, {
                foreignKey: "serviceTopicId",
                as: "appeals"
            })
            this.hasMany(Ticket, {
                foreignKey: "serviceTopicId",
                as: "tickets"
            })
        }
    };
    ServicesTopic.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        sequelize,
        modelName: "ServicesTopic",
        tableName: "services_topic"
    });
    return ServicesTopic;
};