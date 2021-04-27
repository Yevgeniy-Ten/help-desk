const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Chat extends Model {
        static associate({ User, Request }) {
            // принадлежит к юзеру, связывается через userId
            this.belongsTo(User, {
                foreignKey: "clientId",
                as: "clientChat"
            });
            this.belongsTo(User, {
                foreignKey: "employeeId",
                as: "employeeChat"
            });
            this.belongsTo(Request, {
                foreignKey: "requestId",
                as: "request"
            });
        }
    };
    Chat.init({
        clientId: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        employeeId: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        requestId: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Chat",
        tableName: "chat",
    });
    return Chat;
};
