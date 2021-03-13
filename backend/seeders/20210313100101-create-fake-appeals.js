"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let appeals = ["Что то не получается нажать на кнопку",
            "У меня зарядка глючит", "Градусник показывает 40"]
        appeals = appeals.map((title, i) => {
            return {
                title,
                description: "Lorem lorem lorem",
                userId: i + 1,
                topicId: i + 1,
                serviceTopicId: i + 1
            }
        })
        await queryInterface.bulkInsert("appeals", appeals, {});
    },

    down: async (queryInterface, Sequelize) => {

    }
};
