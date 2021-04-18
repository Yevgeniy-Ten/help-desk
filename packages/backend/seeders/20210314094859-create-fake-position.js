module.exports = {
  up: async (queryInterface) => {
    let position = [
      {
        title: "Глав. бух.",
      },
      {
        title: "помошник глав. буха.",
      },
      {
        title: "Глав. аналитик",
      },
      {
        title: "аналитик",
      },
      {
        title: "Сис. админ",
      },
      {
        title: "помошник Сис. админа",
      },
    ];
    position = position.map((element, i) => ({
      title: element.title,
    }));
    await queryInterface.bulkInsert("position", position, {});
  },

  down: async () => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
