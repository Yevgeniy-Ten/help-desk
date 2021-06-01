module.exports = {
  up: async (queryInterface) => {
    const solutions = [
      {
        topicId: 1,
        questionTitle: "Как обновить браузер",
        answer: "Нажмите F5",
        privateForUser: true
      },
      {
        topicId: 2,
        questionTitle: "Как получить отчет",
        answer: "Создайте заявку, с тематикой Бухгалтерия",
        privateForUser: false
      },
      {
        topicId: 3,
        questionTitle: "Как получить отчет",
        answer: "Для получения отчета, создайте заявку с тематикой Отчетность.",
        privateForUser: false
      },
      {
        topicId: 1,
        questionTitle: "Как подключить мышку",
        answer:
          "Распакуйте мышку, далее USB порт мышки поключите к USB вашего ПК",
        privateForUser: false
      },
      {
        topicId: 2,
        questionTitle: "На какой email отправить бух.отчет",
        answer: "Отправляете на email bux.uchet@mail.ru",
        privateForUser: true
      },
      {
        topicId: 3,
        questionTitle: "Сроки выдачи отчетности для компании Beeline",
        answer:
          "Критично время реагирования 2ч. Срочно 5ч. Высокий 10ч. Стандарно 18ч.",
        privateForUser: true
      }
    ];
    await queryInterface.bulkInsert("solutions", solutions);
  }
};
