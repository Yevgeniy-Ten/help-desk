"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let position = [
            {
                title: "Глав. бух.",
            },
            {
                title: "помошник глав. буха.",
            },
            {
                title: "Глав. аналитик",
            },
            {
                title: "аналитик",
            },
            {
                title: "Сис. админ",
            },            {
                title: "помошник Сис. админа",
            }]
        position = position.map((element, i) => {
            return {
                title: element.title,
            }
        })
        await queryInterface.bulkInsert("position", position, {});
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
