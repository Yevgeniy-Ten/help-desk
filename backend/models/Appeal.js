"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Appeal extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({User}) {
            this.belongsTo(User, {
                foreignKey: "userId",
                as: "user"
            })
            // define association here
        }
    };
    Appeal.init({
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "Appeal",
        tableName: "appeals",
    });
    return Appeal;
};