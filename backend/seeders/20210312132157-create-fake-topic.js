"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let topics = ["Сайты", "Технические проблемы", "Медицина"]
        topics = topics.map(name => ({name}))
        await queryInterface.bulkInsert("topics",
            topics, {});
    },

    down: async (queryInterface, Sequelize) => {

    }
};
