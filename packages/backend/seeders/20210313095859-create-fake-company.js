"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let company = [
            {
                title: "BPContact",
            },
            {
                title: "Beeline",
            },
            {
                title: "Halyk Bank",
            },
            {
                title: "KaspiKZ",
            }]
        company = company.map((element, i) => {
            return {
                title: element.title,
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
