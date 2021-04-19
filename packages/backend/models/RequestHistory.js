const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class RequestHistory extends Model {
        static associate({Request}) {
            this.belongsTo(Request, {
                foreignKey: "requestId",
                as: "request"
            })
        }
    };
    RequestHistory.init({
        requestId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        employeeId: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        departmentId: {
            type: DataTypes.INTEGER,
        },
        priority: {
            type: DataTypes.ENUM("Срочно", "Средний", "Стандартно", "Критично"),
            defaultValue: "Стандартно",
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("Открыто", "Выполняется", "Приостановлено", "Выполнено"),
            defaultValue: "Открыто",
            allowNull: false
        },
        deadline: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hourWork: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        addHourWork: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "RequestHistory",
        tableName: "request_history"
    });
    return RequestHistory;
};
