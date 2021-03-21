"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let users = ["ten@mail.ru", "kuat@mail.ru", "aza@mail.ru", "nur@mail.ru"]
        let company = 1;
        users = users.map((email, i) => {
            if (i === 3) company = 3
            if (i === 4) company = 2
            return {
                email,
                lastName: "esdp",
                firstName: "dev",
                password: "esdp",
                departmentId: 3,
                roleId: 3,
                companyId: company,
                // createdAt: new Date(), updatedAt: new Date()
            }
        })
        await queryInterface.bulkInsert("users", users, {});
    },

    down: async (queryInterface, Sequelize) => {
    }
};
