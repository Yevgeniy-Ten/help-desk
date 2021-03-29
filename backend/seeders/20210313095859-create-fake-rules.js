"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let rules = [
            {
                copmanyId: 2,
                priority: "Стандартно",
                topicId: 1,
                title: "Регламент",
                deadline: 12,
                departmentId: 3,
            },
            {
                copmanyId: 2,
                priority: "Средний",
                topicId: 1,
                title: "Регламент",
                deadline: 8,
                departmentId: 3,
            },
            {
                copmanyId: 2,
                priority: "Срочно",
                topicId: 1,
                title: "Регламент",
                deadline: 6,
                departmentId: 3,
            },
            {
                copmanyId: 2,
                priority: "Критично",
                topicId: 1,
                title: "Регламент",
                deadline: 2,
                departmentId: 3,
            },
            
            {
                copmanyId: 3,
                priority: "Стандартно",
                topicId: 2,
                title: "Регламент",
                deadline: 24,
                departmentId: 1,
            },
            {
                copmanyId: 3,
                priority: "Средний",
                topicId: 2,
                title: "Регламент",
                deadline: 18,
                departmentId: 1,
            },
            {
                copmanyId: 3,
                priority: "Срочно",
                topicId: 2,
                title: "Регламент",
                deadline: 12,
                departmentId: 1,
            },
            {
                copmanyId: 3,
                priority: "Критично",
                topicId: 2,
                title: "Регламент",
                deadline: 6,
                departmentId: 1,
            },

            {
                copmanyId: 4,
                priority: "Стандартно",
                topicId: 3,
                title: "Регламент",
                deadline: 48,
                departmentId: 2,
            },
            {
                copmanyId: 4,
                priority: "Средний",
                topicId: 3,
                title: "Регламент",
                deadline: 36,
                departmentId: 2,
            },
            {
                copmanyId: 4,
                priority: "Срочно",
                topicId: 3,
                title: "Регламент",
                deadline: 24,
                departmentId: 2,
            },
            {
                copmanyId: 4,
                priority: "Критично",
                topicId: 3,
                title: "Регламент",
                deadline: 12,
                departmentId: 2,
            }
            ]
        rules = rules.map((element, i) => {
            return {
                copmanyId: element.copmanyId,
                priority: element.priority,
                topicId: element.topicId,
                title: element.title,
                deadline: element.deadline,
                departmentId: element.departmentId,
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
