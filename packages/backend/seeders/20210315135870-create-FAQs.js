module.exports = {
  up: async (queryInterface) => {
    const solutions = [
      {
        id: 1,
        topicId: 1,
        questionTitle: "Как обновить браузер",
        answer: "Нажмите F5",
        privateForUser: false
      },
      {
        id: 2,
        topicId: 2,
        questionTitle: "Как получить отчет",
        answer: "Создайте заявку, с тематикой Бухгалтерия",
        privateForUser: false
      },
      {
        id: 3,
        topicId: 3,
        questionTitle: "Как получить отчет",
        answer: "Для получения отчета, создайте заявку с тематикой Отчетность.",
        privateForUser: false
      }
    ];
    await queryInterface.bulkInsert("solutions", solutions);
  }
};
