"use strict";
//  Бухгалтерия
//  Техническая поддержка
//  Отчетность
module.exports = {
    up: async (queryInterface, Sequelize) => {
        let topics = [
            {
                title: "Сайты",
            },
            {
                title: "Техническая поддержка",
            },
            {
                title: "Бухгалтерия",
            },
            {
                title: "Отчетность",
            },
            {
                title: "Медицина",
            }]
        topics = topics.map((el, i) => {
            return {
                topicId: i + 1,
                title: el.title,
                deadline: i + 2,
                departmentId: i + 1,
            }
        })
        await queryInterface.bulkInsert("topics",
            topics, {});
    },

    down: async (queryInterface, Sequelize) => {

    }
};
