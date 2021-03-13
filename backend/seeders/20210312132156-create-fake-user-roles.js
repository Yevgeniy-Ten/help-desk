"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("user_roles",
            [{
                name: "moderator",
                accessAppeals: "get,update,delete",
                accessUsers: "get,update,delete",
                accessTickets: "get,update,delete",
            }, {
                name: "client",
                accessAppeals: "get,update,delete",
                accessUsers: "not",
                accessTickets: "not"
            },
                {
                    name: "employee",
                    accessAppeals: "get,update",
                    accessUsers: "not",
                    accessTickets: "get,update",
                }], {});
    },

    down: async (queryInterface, Sequelize) => {

    }
};
