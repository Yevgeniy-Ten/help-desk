module.exports = {
  up: async (queryInterface) => {
    let company = [
      {
        title: "BPContact",
      },
      {
        title: "Beeline",
      },
      {
        title: "Halyk Bank",
      },
      {
        title: "KaspiKZ",
      },
    ];
    company = company.map((element) => ({
      title: element.title,
    }));
    await queryInterface.bulkInsert("company", company, {});
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
