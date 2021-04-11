"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let reglaments = [
            {
                companyId: null,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 12,
                topicId: 1,
                departmentId: 1
            },
            {
                companyId: null,
                priority: "Средний",
                title: "Регламент",
                deadline: 8,
                topicId: 1,
                departmentId: 1
            },
            {
                companyId: null,
                priority: "Срочно",
                title: "Регламент",
                deadline: 6,
                topicId: 1,
                departmentId: 1
            },
            {
                companyId: null,
                priority: "Критично",
                title: "Регламент",
                deadline: 2,
                topicId: 1,
                departmentId: 1
            },

            {
                companyId: null,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 12,
                topicId: 1,
                departmentId: 3
            },
            {
                companyId: null,
                priority: "Средний",
                title: "Регламент",
                deadline: 8,
                topicId: 1,
                departmentId: 3
            },
            {
                companyId: null,
                priority: "Срочно",
                title: "Регламент",
                deadline: 6,
                topicId: 1,
                departmentId: 3
            },
            {
                companyId: null,
                priority: "Критично",
                title: "Регламент",
                deadline: 2,
                topicId: 1,
                departmentId: 3
            },

            {
                companyId: null,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 24,
                topicId: 2,
                departmentId: 2
            },
            {
                companyId: null,
                priority: "Средний",
                title: "Регламент",
                deadline: 18,
                topicId: 2,
                departmentId: 2
            },
            {
                companyId: null,
                priority: "Срочно",
                title: "Регламент",
                deadline: 12,
                topicId: 2,
                departmentId: 2
            },
            {
                companyId: null,
                priority: "Критично",
                title: "Регламент",
                deadline: 6,
                topicId: 2,
                departmentId: 2
            },
            {
                companyId: null,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 48,
                topicId: 3,
                departmentId: 3
            },
            {
                companyId: null,
                priority: "Средний",
                title: "Регламент",
                deadline: 36,
                topicId: 3,
                departmentId: 3
            },
            {
                companyId: null,
                priority: "Срочно",
                title: "Регламент",
                deadline: 24,
                topicId: 3,
                departmentId: 3
            },
            {
                companyId: null,
                priority: "Критично",
                title: "Регламент",
                deadline: 12,
                topicId: 3,
                departmentId: 3
            },
            {
                companyId: 2,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 48,
                topicId: 3,
                departmentId: 3
            },
            {
                companyId: 2,
                priority: "Средний",
                title: "Регламент",
                deadline: 36,
                topicId: 3,
                departmentId: 3
            },
            {
                companyId: 2,
                priority: "Срочно",
                title: "Регламент",
                deadline: 24,
                topicId: 3,
                departmentId: 3
            },
            {
                companyId: 2,
                priority: "Критично",
                title: "Регламент",
                deadline: 12,
                topicId: 3,
                departmentId: 3
            },
            {
                companyId: 2,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 48,
                topicId: 3,
                departmentId: 1
            },
            {
                companyId: 2,
                priority: "Средний",
                title: "Регламент",
                deadline: 36,
                topicId: 3,
                departmentId: 1
            },
            {
                companyId: 2,
                priority: "Срочно",
                title: "Регламент",
                deadline: 24,
                topicId: 3,
                departmentId: 1
            },
            {
                companyId: 2,
                priority: "Критично",
                title: "Регламент",
                deadline: 12,
                topicId: 3,
                departmentId: 1
            },
            // 
            {
                companyId: 3,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 48,
                topicId: 3,
                departmentId: 3
            },
            {
                companyId: 3,
                priority: "Средний",
                title: "Регламент",
                deadline: 36,
                topicId: 3,
                departmentId: 3
            },
            {
                companyId: 3,
                priority: "Срочно",
                title: "Регламент",
                deadline: 24,
                topicId: 3,
                departmentId: 3
            },
            {
                companyId: 3,
                priority: "Критично",
                title: "Регламент",
                deadline: 12,
                topicId: 3,
                departmentId: 3
            },
            // 
            {
                companyId: 3,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 48,
                topicId: 3,
                departmentId: 1
            },
            {
                companyId: 3,
                priority: "Средний",
                title: "Регламент",
                deadline: 36,
                topicId: 3,
                departmentId: 1
            },
            {
                companyId: 3,
                priority: "Срочно",
                title: "Регламент",
                deadline: 24,
                topicId: 3,
                departmentId: 1
            },
            {
                companyId: 3,
                priority: "Критично",
                title: "Регламент",
                deadline: 12,
                topicId: 3,
                departmentId: 1
            },
            // 
            // 
            {
                companyId: 3,
                priority: "Стандартно",
                title: "Регламент",
                deadline: 48,
                topicId: 3,
                departmentId: 2
            },
            {
                companyId: 3,
                priority: "Средний",
                title: "Регламент",
                deadline: 36,
                topicId: 3,
                departmentId: 2
            },
            {
                companyId: 3,
                priority: "Срочно",
                title: "Регламент",
                deadline: 24,
                topicId: 3,
                departmentId: 2
            },
            {
                companyId: 3,
                priority: "Критично",
                title: "Регламент",
                deadline: 12,
                topicId: 3,
                departmentId: 2
            },
        ]
        let reglamentsCopy;
        for (let i = 0; i < 3; i++) {
            reglamentsCopy = reglaments.map((element) => {
                return {
                    companyId: element.companyId,
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