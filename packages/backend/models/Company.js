const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate({ Reglaments, User }) {
      this.hasMany(Reglaments, {
        foreignKey: "companyId",
        as: "copmanyRules",
      });
      // имеет много юзерув, связывается через userId
      // clientRequest
      this.hasMany(User, {
        foreignKey: "companyId",
        as: "users",
      });
    }
  }
  Company.init(
    {
      title: DataTypes.STRING,
      // description:DataTypes.STRING,
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Company",
      tableName: "company",
    }
  );
  return Company;
};
