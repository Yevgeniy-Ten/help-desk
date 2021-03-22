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
        let depId;
        topics = topics.map((el, i) => {
            depId = 3;
            if (i < 3) depId = i + 1;
            return {
                topicId: i + 1,
                title: el.title,
                deadline: i + 2,
                departmentId: parseInt(depId),
            }
        })
        await queryInterface.bulkInsert("topics",
            topics, {});
    },

    down: async (queryInterface, Sequelize) => {

    }
};
