module.exports = {
  up: async (queryInterface) => {
    let department = [
      {
        title: "Отдел бухгалтерии",
      },
      {
        title: "Отдел аналитики",
      },
      {
        title: "Отдел тех поддержки",
      },
    ];
    department = department.map((element) => ({
      title: element.title,
    }));
    await queryInterface.bulkInsert("department", department, {});
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
