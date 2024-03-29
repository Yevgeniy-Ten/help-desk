module.exports = {
  up: async (queryInterface) => {
    const reglaments = [
      {
        companyId: null,
        priority: "Стандартно",
        title: "Регламент",
        deadline: 12,
        topicId: 1,
        departmentId: 3,
      },
      {
        companyId: null,
        priority: "Средний",
        title: "Регламент",
        deadline: 8,
        topicId: 1,
        departmentId: 3,
      },
      {
        companyId: null,
        priority: "Срочно",
        title: "Регламент",
        deadline: 6,
        topicId: 1,
        departmentId: 3,
      },
      {
        companyId: null,
        priority: "Критично",
        title: "Регламент",
        deadline: 2,
        topicId: 1,
        departmentId: 3,
      },

      {
        companyId: null,
        priority: "Стандартно",
        title: "Регламент",
        deadline: 24,
        topicId: 2,
        departmentId: 1,
      },
      {
        companyId: null,
        priority: "Средний",
        title: "Регламент",
        deadline: 18,
        topicId: 2,
        departmentId: 1,
      },
      {
        companyId: null,
        priority: "Срочно",
        title: "Регламент",
        deadline: 12,
        topicId: 2,
        departmentId: 1,
      },
      {
        companyId: null,
        priority: "Критично",
        title: "Регламент",
        deadline: 6,
        topicId: 2,
        departmentId: 1,
      },

      {
        companyId: null,
        priority: "Стандартно",
        title: "Регламент",
        deadline: 48,
        topicId: 3,
        departmentId: 2,
      },
      {
        companyId: null,
        priority: "Средний",
        title: "Регламент",
        deadline: 36,
        topicId: 3,
        departmentId: 2,
      },
      {
        companyId: null,
        priority: "Срочно",
        title: "Регламент",
        deadline: 24,
        topicId: 3,
        departmentId: 2,
      },
      {
        companyId: null,
        priority: "Критично",
        title: "Регламент",
        deadline: 12,
        topicId: 3,
        departmentId: 2,
      },

      {
        companyId: 2,
        priority: "Стандартно",
        title: "Регламент",
        deadline: 48,
        topicId: 3,
        departmentId: 2,
      },
      {
        companyId: 2,
        priority: "Средний",
        title: "Регламент",
        deadline: 36,
        topicId: 3,
        departmentId: 2,
      },
      {
        companyId: 2,
        priority: "Срочно",
        title: "Регламент",
        deadline: 24,
        topicId: 3,
        departmentId: 2,
      },
      {
        companyId: 2,
        priority: "Критично",
        title: "Регламент",
        deadline: 12,
        topicId: 3,
        departmentId: 2,
      },

      {
        companyId: 3,
        priority: "Стандартно",
        title: "Регламент",
        deadline: 48,
        topicId: 1,
        departmentId: 3,
      },
      {
        companyId: 3,
        priority: "Средний",
        title: "Регламент",
        deadline: 36,
        topicId: 1,
        departmentId: 3,
      },
      {
        companyId: 3,
        priority: "Срочно",
        title: "Регламент",
        deadline: 24,
        topicId: 1,
        departmentId: 3,
      },
      {
        companyId: 3,
        priority: "Критично",
        title: "Регламент",
        deadline: 12,
        topicId: 1,
        departmentId: 3,
      },
      
      {
        companyId: 4,
        priority: "Стандартно",
        title: "Регламент",
        deadline: 48,
        topicId: 2,
        departmentId: 1,
      },
      {
        companyId: 4,
        priority: "Средний",
        title: "Регламент",
        deadline: 36,
        topicId: 2,
        departmentId: 1,
      },
      {
        companyId: 4,
        priority: "Срочно",
        title: "Регламент",
        deadline: 24,
        topicId: 2,
        departmentId: 1,
      },
      {
        companyId: 4,
        priority: "Критично",
        title: "Регламент",
        deadline: 12,
        topicId: 2,
        departmentId: 1,
      },
    ];
    let reglamentsCopy;
    for (let i = 0; i < 3; i += 1) {
      reglamentsCopy = reglaments.map((element) => ({
        companyId: element.companyId,
        priority: element.priority,
        topicId: element.topicId,
        title: element.title,
        deadline: element.deadline,
        departmentId: element.departmentId,
      }));
    }
    await queryInterface.bulkInsert("reglaments", reglamentsCopy, {});
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
