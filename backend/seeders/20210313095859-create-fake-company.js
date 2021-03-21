"use strict";
//  Бухгалтерия
//  Техническая поддержка
//  Отчетность
module.exports = {
    up: async (queryInterface, Sequelize) => {
        let company = [
            {
                name: "Beeline",
            },
            {
                name: "HalukBank",
            },
            {
                name: "KaspiKZ",
            }]
        company = company.map((element, i) => {
            return {
                name: element.name,
            }
        })
        await queryInterface.bulkInsert("company", company, {});
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
