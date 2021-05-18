const {Model} = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class Log extends Model {
        static associate() {
        }
    }

    Log.init(
        {
            actionType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            sequelize,
            modelName: "Log",
            tableName: "logs",
        }
    );
    return Log;
};
