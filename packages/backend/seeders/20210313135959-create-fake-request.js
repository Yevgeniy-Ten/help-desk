"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // let request = [
        //     {
        //         title: "Что то не получается нажать на кнопку",
        //         description: "Не открывается сайт",
        //     },
        //     {
        //         title: "У меня зарядка глючит",
        //         description: "Глючит аппаратура",
        //     },
        //     {
        //         title: "Градусник показывает 40",
        //         description: "Температура высокая",
        //     }]
        // request = request.map((element, i) => {
        //     return {
        //         title: element.title,
        //         description: element.description,
        //         clientId: i + 1,
        //         employeeId: i + 1,
        //         topicId: i + 1,
        //         deadline: new Date(),
        //         hourWork: i + 8,
        //         createdAt: new Date(), updatedAt: new Date()
        //         // status default открыто
        //         // priority default стандартно
        //     }
        // })
        // await queryInterface.bulkInsert("request", request, {});
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
