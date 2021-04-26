const { Department } = require("../../../../models");
//
const DepartmentController = {
  async getAllDepartment(req, res) {
    try {
      // if (req.query) {
      //     const { id } = req.query;
      //     const user = await User.findOne({
      //         where: { id: id },
      //         include: ["company", "departmentUser", "role"],
      //     });
      //     if (!user) return res.sendStatus(404);
      //     console.log(user)
      //     if (user.role.name === "client") return res.status(403).send({ message: "Не являетеся сотрудником компании." });
      // }

      const departments = await Department.findAll();
      if (!departments.length) return res.sendStatus(404);
      res.send(departments);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const department = await Department.findOne({ id });
      if (!department) return res.sendStatus(404);
      res.send(department);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  async create(req, res) {
    const { title } = req.body;
    Department.create({
      title
    })
      .then((newDepartment) => res.status(201).send(newDepartment))
      .catch((errors) => {
        res.status(400).send(errors);
      });
  },
  async edit(req, res) {
    try {
      const { id } = req.params;
      console.log("id", req.params);
      const department = await Department.findOne({ id });
      if (!department) return res.sendStatus(404);
      await department.update(req.body);
      res.send(department);
    } catch (e) {
      res.status(401).send(e);
    }
  },
  async deleteDepartment(req, res) {
    try {
      const message = { message: "Удалено успешно" };
      await Department.destroy({ where: { id: req.params.id } });
      return res.send(message);
    } catch (e) {
      res.status(401).send(e);
    }
  }
};
module.exports = DepartmentController;
