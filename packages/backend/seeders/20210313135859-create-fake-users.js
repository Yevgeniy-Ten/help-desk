"use strict";
const bcrypt = require("bcryptjs")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const pass1 = '123456';
        const pass2 = '123456';
        const hashPass1 = await bcrypt.hash(pass1, 10)
        const hashPass2 = await bcrypt.hash(pass2, 10)
        const users = [{
            email: "test@mail.ru",
            lastName: "esdp",
            firstName: "dev",
            password: hashPass1,
            departmentId: 1,
            roleId: 1,
            companyId: 1,
            isAuthorized: true,
            phoneNumber: '+77054546622'
            // createdAt: new Date(), updatedAt: new Date()
        }, {
            email: "user@mail.ru",
            lastName: "user",
            firstName: "user",
            password: hashPass2,
            departmentId: null,
            roleId: 2,
            companyId: 2,
            isAuthorized: false,
            phoneNumber: '+77774546622'
            // createdAt: new Date(), updatedAt: new Date()
        }]
        await queryInterface.bulkInsert("users", users, {});
    },

    down: async (queryInterface, Sequelize) => {
    }
};
