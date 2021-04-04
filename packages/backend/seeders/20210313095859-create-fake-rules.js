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
                topicId: 1,
                departmentId: 1
            },
            {
                copmanyId: 2,
                priority: "Средний",
                title: "Регламент",
                deadline: 8,
                topicId: 1,
                departmentId: 1
            },
            {
                copmanyId: 2,
                priority: "Срочно",
                title: "Регламент",
                deadline: 6,
                topicId: 1,
                departmentId: 1
            },
            {
                copmanyId: 2,
                priority: "Критично",
                title: "Регламент",
                deadline: 2,
                topicId: 1,
                departmentId: 1
            },

            {
                copmanyId: 3,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 24,
                topicId: 2,
                departmentId: 2
            },
            {
                copmanyId: 3,
                priority: "Средний",
                title: "Регламент",
                deadline: 18,
                topicId: 2,
                departmentId: 2
            },
            {
                copmanyId: 3,
                priority: "Срочно",
                title: "Регламент",
                deadline: 12,
                topicId: 2,
                departmentId: 2
            },
            {
                copmanyId: 3,
                priority: "Критично",
                title: "Регламент",
                deadline: 6,
                topicId: 2,
                departmentId: 2
            },

            {
                copmanyId: 4,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 48,
                topicId: 3,
                departmentId: 3
            },
            {
                copmanyId: 4,
                priority: "Средний",
                title: "Регламент",
                deadline: 36,
                topicId: 3,
                departmentId: 3
            },
            {
                copmanyId: 4,
                priority: "Срочно",
                title: "Регламент",
                deadline: 24,
                topicId: 3,
                departmentId: 3
            },
            {
                copmanyId: 4,
                priority: "Критично",
                title: "Регламент",
                deadline: 12,
                topicId: 3,
                departmentId: 3
            }
        ]
        let rulesCopy;
        for (let i = 0; i < 3; i++) {
            rulesCopy = rules.map((element) => {
                return {
                    copmanyId: element.copmanyId,
                    priority: element.priority,
                    topicId: element.topicId,
                    title: element.title,
                    deadline: element.deadline,
                    departmentId: element.departmentId,
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
