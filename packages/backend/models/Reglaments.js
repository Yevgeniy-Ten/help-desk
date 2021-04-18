const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reglaments extends Model {
    static associate({ Company, Topic, Department }) {
      this.belongsTo(Company, {
        foreignKey: "companyId",
        as: "company",
      });
      // принадлежит к отделу связывается через topicId
      this.belongsTo(Department, {
        foreignKey: "departmentId",
        as: "department",
      });
      // принадлежит к тематике связывается через topicId
      this.belongsTo(Topic, {
        foreignKey: "topicId",
        as: "topic",
      });
    }
  }
  Reglaments.init(
    {
      companyId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      priority: {
        type: DataTypes.ENUM("Срочно", "Средний", "Стандартно", "Критично"),
        defaultValue: "Стандартно",
        allowNull: false,
      },
      topicId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deadline: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        // defaultValue: null,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Reglaments",
      tableName: "reglaments",
    }
  );
  return Reglaments;
};
