"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let orgStructure = [
            {
                departmentId: 1,
                positionId: 1,
            },
            {
                departmentId: 1,
                positionId: 2,
            },
            {
                departmentId: 2,
                positionId: 3,
            },
            {
                departmentId: 2,
                positionId: 4,
            },
            {
                departmentId: 3,
                positionId: 5,
            }]
        orgStructure = orgStructure.map((element, i) => {
            return {
                title: element.title,
            }
        })
        await queryInterface.bulkInsert("org_structure", orgStructure, {});
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
