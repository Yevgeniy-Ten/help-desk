const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate({ Appeal, Ticket }) {
      this.hasMany(Appeal, {
        foreignKey: "chatId",
        as: "appealChat",
      });
      this.hasMany(Ticket, {
        foreignKey: "chatId",
        as: "ticketChat",
      });
    }
  }
  Chat.init(
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Chat",
      tableName: "chats",
    }
  );
  return Appeal;
};
