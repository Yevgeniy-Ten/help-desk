"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Appeal extends Model {
        static associate({ User, Ticket, Topic, }) {
            // принадлежит к юзеру, связывается через userId
            this.belongsTo(User, {
                foreignKey: "userId",
                as: "user"
            })
            // принадлежит тикету, связывается через ticketId
            // this.belongsTo(Ticket, {
            //     foreignKey: "ticketId",
            //     as: "ticket"
            // })

            // принадлежит к тематике связывается через topicId
            this.belongsTo(Topic, {
                foreignKey: "topicId",
                as: "topic"
            })
        }
    };
    Appeal.init({
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        priority: {
            type: DataTypes.ENUM("Срочно", "Средний", "Стандартно", "Инцидент"),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("Открыто", "В процессе", "Выполнено"),
            allowNull: false
        },
        deadline: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
            allowNull: false
        },
        hourWork: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: false,
        sequelize,
        modelName: "Appeal",
        tableName: "appeals",
    });
    return Appeal;
};