"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let servicesByTopics = ["Не открывается сайт", "Глючит аппаратура", "Температура высокая"]
        servicesByTopics = servicesByTopics.map((name, i) => ({
            name,
            topicId: i + 1,
        }))
        await queryInterface.bulkInsert("services_topic",
            servicesByTopics, {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
