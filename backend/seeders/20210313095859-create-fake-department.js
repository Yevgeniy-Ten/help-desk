"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let department = [
            {
                title: "Отдел бухгалтерии",
            },
            {
                title: "Отдел аналитики",
            },
            {
                title: "Отдел тех поддержки",
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
