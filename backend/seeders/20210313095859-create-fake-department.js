"use strict";
//  Бухгалтерия
//  Техническая поддержка
//  Отчетность
module.exports = {
    up: async (queryInterface, Sequelize) => {
        let department = [
            {
                name: "Бухгалтерия",
            },
            {
                name: "Отчетность",
            },
            {
                name: "Техническая поддержка",
            }]
        department = department.map((element, i) => {
            return {
                name: element.name,
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
