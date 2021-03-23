"use strict";
//  Бухгалтерия
//  Техническая поддержка
//  Отчетность
module.exports = {
    up: async (queryInterface, Sequelize) => {
        let department = [
            {
                title: "Бухгалтерия",
            },
            {
                title: "Отчетность",
            },
            {
                title: "Техническая поддержка",
            }]
        department = department.map((element, i) => {
            return {
                title: element.title,
            }
        })
        await queryInterface.bulkInsert("department", department, {});
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
