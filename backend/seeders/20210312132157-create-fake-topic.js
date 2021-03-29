"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let topics = [
            {
                title: "Сайты",
            },
            // {
            //     title: "Техническая поддержка",
            // },
            {
                title: "Бухгалтерия",
            },
            {
                title: "Отчетность",
            },
            // {
            //     title: "Медицина",
            // }
            ]
        let depId;
        topics = topics.map((el, i) => {
            return {
                title: el.title,
            }
        })
        await queryInterface.bulkInsert("topics",
            topics, {});
    },

    down: async (queryInterface, Sequelize) => {

    }
};
