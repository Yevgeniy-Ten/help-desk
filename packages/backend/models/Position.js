const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    static associate({ OrgStructure }) {
      // имеет много должностей
      this.hasMany(OrgStructure, {
        foreignKey: "positionId",
        as: "positionOrgStre",
      });
    }
  }
  Position.init(
    {
      title: {
        type: DataTypes.STRING,
        // allowNull: false
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Position",
      tableName: "position",
    }
  );
  return Position;
};
