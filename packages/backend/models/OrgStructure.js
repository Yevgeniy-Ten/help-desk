const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrgStructure extends Model {
    static associate({ Position, Department, User }) {
      // принадлежит сущности должность
      this.belongsTo(Position, {
        foreignKey: "positionId",
        as: "position",
      });
      this.belongsTo(Department, {
        foreignKey: "departmentId",
        as: "department",
      });
      this.hasMany(User, {
        foreignKey: "orgStructureId",
        as: "users",
      });
    }
  }
  OrgStructure.init(
    {
      positionId: {
        type: DataTypes.INTEGER,
        // defaultValue: null,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        // defaultValue: null,
      },
      isMain: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "OrgStructure",
      tableName: "org_structure",
    }
  );
  return OrgStructure;
};
