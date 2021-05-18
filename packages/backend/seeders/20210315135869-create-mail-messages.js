const messagesTypes = require("../app/mailer/messageTypes");

module.exports = {
  up: async (queryInterface) => {
    const messages = [
      {
        id: 1,
        type: messagesTypes.VERIFY_MESSAGE,
        message: "Добрый день добро пожаловать в нашу систему"
      },
      {
        id: 2,
        type: messagesTypes.CLIENT_REQUEST_CREATE,
        message: "Новая заявка"
      },
      {
        id: 3,
        type: messagesTypes.EMPLOYEE_REQUEST_CREATE,
        message: "Новая заявка вы отвественный"
      }
    ];
    await queryInterface.bulkInsert("mail_messages", messages);
  }
};
