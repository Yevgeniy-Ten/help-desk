const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Solution extends Model {
        static associate({Topic}) {
            this.belongsTo(Topic, {
                foreignKey: "topicId",
                as: "topicSolution",
            });
        }
    }

    Solution.init(
        {
            topicId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            questionTitle: {
                type: DataTypes.STRING,
            },
            answer: {
                type: DataTypes.STRING
            },
            private: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            videoPath: DataTypes.STRING,
        },
        {
            sequelize,
            timestamps: false,
            modelName: "Solution",
            tableName: "solutions",
        }
    );
    return Solution;
};
