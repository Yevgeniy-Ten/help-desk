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
            orgStructureId: 1,
            roleId: 1,
            companyId: 1,
            isAuthorized: true,
            phoneNumber: '+77054546622'
            // createdAt: new Date(), updatedAt: new Date()
        },
        {
            email: "test1@mail.ru",
            lastName: "esdp1",
            firstName: "dev1",
            password: hashPass1,
            orgStructureId: 2,
            roleId: 1,
            companyId: 1,
            isAuthorized: true,
            phoneNumber: '+77054546622'
            // createdAt: new Date(), updatedAt: new Date()
        },
        {
            email: "test2@mail.ru",
            lastName: "esdp2",
            firstName: "dev2",
            password: hashPass1,
            orgStructureId: 3,
            roleId: 1,
            companyId: 1,
            isAuthorized: true,
            phoneNumber: '+77054546622'
            // createdAt: new Date(), updatedAt: new Date()
        },
        {
            email: "test3@mail.ru",
            lastName: "esdp3",
            firstName: "dev3",
            password: hashPass1,
            orgStructureId: 4,
            roleId: 1,
            companyId: 1,
            isAuthorized: true,
            phoneNumber: '+77054546622'
            // createdAt: new Date(), updatedAt: new Date()
        },
        {
            email: "test4@mail.ru",
            lastName: "esdp4",
            firstName: "dev4",
            password: hashPass1,
            orgStructureId: 5,
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
