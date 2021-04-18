module.exports = {
  up: async (queryInterface) => {
    let orgStructure = [
      {
        departmentId: 1,
        positionId: 1,
        isMain: 1,
      },
      {
        departmentId: 1,
        positionId: 2,
        isMain: 0,
      },
      {
        departmentId: 2,
        positionId: 3,
        isMain: 1,
      },
      {
        departmentId: 2,
        positionId: 4,
        isMain: 0,
      },
      {
        departmentId: 3,
        positionId: 5,
        isMain: 1,
      },
    ];
    orgStructure = orgStructure.map((element, i) => ({
      departmentId: element.departmentId,
      positionId: element.positionId,
      isMain: element.isMain,
    }));
    await queryInterface.bulkInsert("org_structure", orgStructure, {});
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
