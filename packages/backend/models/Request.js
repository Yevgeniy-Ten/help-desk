const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate({ User, Topic, Department, RequestHistory, Chat }) {
      // принадлежит к юзеру, связывается через userId
      this.belongsTo(User, {
        foreignKey: "clientId",
        as: "clientRequest",
      });
      this.belongsTo(User, {
        foreignKey: "employeeId",
        as: "employeeRequest",
      });
      this.belongsTo(Department, {
        foreignKey: "departmentId",
        as: "department",
      });
      //
      this.hasMany(RequestHistory, {
        foreignKey: "requestId",
        as: "requestHistory",
      });
      // принадлежит к тематике связывается через topicId
      this.belongsTo(Topic, {
        foreignKey: "topicId",
        as: "topic",
      });
      this.hasMany(Chat, {
        foreignKey: "requestId",
        as: "request",
      });
    }
  }
  Request.init(
    {
      clientId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      employeeId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        // defaultValue: null,
      },
      priority: {
        type: DataTypes.ENUM("Срочно", "Средний", "Стандартно", "Критично"),
        defaultValue: "Стандартно",
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      status: {
        type: DataTypes.ENUM(
          "Открыто",
          "Выполняется",
          "Приостановлено",
          "Выполнено"
        ),
        defaultValue: "Открыто",
        allowNull: false,
      },
      deadline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hourWork: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      topicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isViewed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Request",
      tableName: "request",
    }
  );
  return Request;
};
