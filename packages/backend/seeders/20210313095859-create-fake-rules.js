"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let reglaments = [
            {
                copmanyId: null,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 12,
                topicId: 1,
                departmentId: 1
            },
            {
                copmanyId: null,
                priority: "Средний",
                title: "Регламент",
                deadline: 8,
                topicId: 1,
                departmentId: 1
            },
            {
                copmanyId: null,
                priority: "Срочно",
                title: "Регламент",
                deadline: 6,
                topicId: 1,
                departmentId: 1
            },
            {
                copmanyId: null,
                priority: "Критично",
                title: "Регламент",
                deadline: 2,
                topicId: 1,
                departmentId: 1
            },

            {
                copmanyId: null,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 24,
                topicId: 2,
                departmentId: 2
            },
            {
                copmanyId: null,
                priority: "Средний",
                title: "Регламент",
                deadline: 18,
                topicId: 2,
                departmentId: 2
            },
            {
                copmanyId: null,
                priority: "Срочно",
                title: "Регламент",
                deadline: 12,
                topicId: 2,
                departmentId: 2
            },
            {
                copmanyId: null,
                priority: "Критично",
                title: "Регламент",
                deadline: 6,
                topicId: 2,
                departmentId: 2
            },

            {
                copmanyId: null,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 48,
                topicId: 3,
                departmentId: 3
            },
            {
                copmanyId: null,
                priority: "Средний",
                title: "Регламент",
                deadline: 36,
                topicId: 3,
                departmentId: 3
            },
            {
                copmanyId: null,
                priority: "Срочно",
                title: "Регламент",
                deadline: 24,
                topicId: 3,
                departmentId: 3
            },
            {
                copmanyId: null,
                priority: "Критично",
                title: "Регламент",
                deadline: 12,
                topicId: 3,
                departmentId: 3
            }
        ]
        let reglamentsCopy;
        for (let i = 0; i < 3; i++) {
            reglamentsCopy = reglaments.map((element) => {
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
        await queryInterface.bulkInsert("reglaments", reglamentsCopy, {});
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
