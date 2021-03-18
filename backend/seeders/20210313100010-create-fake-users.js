"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let users = ["ten@mail.ru", "kuat@mail.ru", "aza@mail.ru", "nur@mail.ru"]
        users = users.map(email => {
            return {
                email,
                lastName: "esdp",
                firstName: "dev",
                password: "esdp",
                // createdAt: new Date(), updatedAt: new Date()
            }
        })
        await queryInterface.bulkInsert("users", users, {});
    },

    down: async (queryInterface, Sequelize) => {
    }
};
