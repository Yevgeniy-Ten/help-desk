const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RequestTask extends Model {
    static associate({ User, Request }) {
      this.belongsTo(User, {
        foreignKey: "employeeId",
        as: "employee",
      });
      this.belongsTo(Request, {
        foreignKey: "requestId",
        as: "request",
      });
    }
  }
  RequestTask.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("notStarted", "started", "finished"),
        allowNull: false,
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "RequestTask",
      tableName: "request_tasks",
    }
  );
  return RequestTask;
};
