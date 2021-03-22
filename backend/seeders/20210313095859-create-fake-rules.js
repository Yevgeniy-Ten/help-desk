"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let rules = [
            {
                name: "Будет сделано до",
                deadline: "2021-03-15 12:32:03",
            },
            {
                name: "Будет сделано до",
                deadline: "2021-03-16 12:32:03",
            },
            {
                name: "Будет сделано до",
                deadline: "2021-03-17 12:32:03",
            }]
        rules = rules.map((element, i) => {
            return {
                name: element.name,
                deadline: element.deadline,
                departmentId: i + 1,
                topicId: i + 1,
            }
        })
        await queryInterface.bulkInsert("rules", rules, {});
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
