"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let department = [
            { title: "Отдел бухгалтерии", },
            { title: "Отдел аналитики", },
            { title: "Отдел тех поддержки", }
        ]
        let rules = [
            {
                copmanyId: 2,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 12,
            },
            {
                copmanyId: 2,
                priority: "Средний",
                title: "Регламент",
                deadline: 8,
            },
            {
                copmanyId: 2,
                priority: "Срочно",
                title: "Регламент",
                deadline: 6,
            },
            {
                copmanyId: 2,
                priority: "Критично",
                title: "Регламент",
                deadline: 2,
            },

            {
                copmanyId: 3,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 24,
            },
            {
                copmanyId: 3,
                priority: "Средний",
                title: "Регламент",
                deadline: 18,
            },
            {
                copmanyId: 3,
                priority: "Срочно",
                title: "Регламент",
                deadline: 12,
            },
            {
                copmanyId: 3,
                priority: "Критично",
                title: "Регламент",
                deadline: 6,
            },

            {
                copmanyId: 4,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 48,
            },
            {
                copmanyId: 4,
                priority: "Средний",
                title: "Регламент",
                deadline: 36,
            },
            {
                copmanyId: 4,
                priority: "Срочно",
                title: "Регламент",
                deadline: 24,
            },
            {
                copmanyId: 4,
                priority: "Критично",
                title: "Регламент",
                deadline: 12,
            }
        ]
        let rulesCopy;
        for (let i = 0; i < 3; i++) {
            rulesCopy = rules.map((element, i) => {
                return {
                    copmanyId: element.copmanyId,
                    priority: element.priority,
                    topicId: i,
                    title: element.title,
                    deadline: element.deadline,
                    departmentId: i,
                }
            })
        }
        await queryInterface.bulkInsert("rules", rulesCopy, {});
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
