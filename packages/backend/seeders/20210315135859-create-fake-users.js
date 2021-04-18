"use strict";
const bcrypt = require("bcryptjs")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const pass1 = '123456';
        const pass2 = '123456';
        const hashPass1 = await bcrypt.hash(pass1, 10)
        const hashPass2 = await bcrypt.hash(pass2, 10)
        const hashPass3 = await bcrypt.hash(pass2, 10)
        const hashPass4 = await bcrypt.hash(pass2, 10)
        const hashPass5 = await bcrypt.hash(pass2, 10)
        const hashPass6 = await bcrypt.hash(pass2, 10)
        const users = [{
            email: "yelena@mail.ru",
            lastName: "Yelene",
            firstName: "Yelena",
            password: hashPass1,
            orgStructureId: 1,
            roleId: 1,
            companyId: 1,
            isAuthorized: true,
            phoneNumber: '+77054546622'
            // createdAt: new Date(), updatedAt: new Date()
        },
        {
            email: "ten@mail.ru",
            lastName: "esdp1",
            firstName: "dev1",
            password: hashPass3,
            orgStructureId: 2,
            roleId: 1,
            companyId: 1,
            isAuthorized: true,
            phoneNumber: '+77054546622'
            // createdAt: new Date(), updatedAt: new Date()
        },
        {
            email: "nurlan@mail.ru",
            lastName: "esdp2",
            firstName: "dev2",
            password: hashPass4,
            orgStructureId: 3,
            roleId: 1,
            companyId: 1,
            isAuthorized: true,
            phoneNumber: '+77054546622'
            // createdAt: new Date(), updatedAt: new Date()
        },
        {
            email: "aza@mail.ru",
            lastName: "esdp3",
            firstName: "dev3",
            password: hashPass5,
            orgStructureId: 4,
            roleId: 1,
            companyId: 1,
            isAuthorized: true,
            phoneNumber: '+77054546622'
            // createdAt: new Date(), updatedAt: new Date()
        },
        {
            email: "kuat@mail.ru",
            lastName: "esdp4",
            firstName: "dev4",
            password: hashPass6,
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
            orgStructureId: null,
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
