const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class MailMessage extends Model {
    static associate() {
    }
  }

  MailMessage.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "MailMessage",
      tableName: "mail_messages"
    }
  );
  return MailMessage;
};
