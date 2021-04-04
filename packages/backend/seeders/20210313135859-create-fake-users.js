"use strict";
const bcrypt = require("bcryptjs")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const pass = '123456';
        const hashPass = await bcrypt.hash(pass, 10)
        const users = [{
            email: "test@mail.ru",
            lastName: "esdp",
            firstName: "dev",
            password: hashPass,
            departmentId: 1,
            roleId: 3,
            companyId: 1,
            isAuthorized: true,
            phoneNumber: '+77054546622'
            // createdAt: new Date(), updatedAt: new Date()
        }]
        await queryInterface.bulkInsert("users", users, {});
    },

    down: async (queryInterface, Sequelize) => {
    }
};
