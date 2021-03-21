"use strict";
//  Бухгалтерия
//  Техническая поддержка
//  Отчетность
module.exports = {
    up: async (queryInterface, Sequelize) => {
        let topics = ["Сайты", "Техническая поддержка", "Медицина", "Бухгалтерия", "Отчетность"]
        topics = topics.map(name => ({ name }))
        await queryInterface.bulkInsert("topics",
            topics, {});
    },

    down: async (queryInterface, Sequelize) => {

    }
};
