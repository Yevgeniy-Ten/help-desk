module.exports = {
  up: async (queryInterface) => {
    let topics = [
      {
        title: "Сайты",
      },
      // {
      //     title: "Техническая поддержка",
      // },
      {
        title: "Бухгалтерия",
      },
      {
        title: "Отчетность",
      },
      // {
      //     title: "Медицина",
      // }
    ];
    topics = topics.map((el) => ({
      title: el.title,
    }));
    await queryInterface.bulkInsert("topics", topics, {});
  },

  down: async () => {},
};
