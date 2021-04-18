const { Reglaments } = require("../../../../models");
// нужно будет синхронизировать историю тиктеа
const ReglamentsController = {
  async createRules(req, res) {
    try {
      const {
        companyId,
        topicId,
        departmentId,
        title,
        standart,
        middle,
        high,
        incident,
        priority,
      } = req.body;
      await Reglaments.create({
        companyId,
        topicId,
        departmentId,
        title,
        deadline: standart,
        priority: "Стандартно",
      });
      await Reglaments.create({
        companyId,
        topicId,
        departmentId,
        title,
        deadline: middle,
        priority: "Средний",
      });
      await Reglaments.create({
        companyId,
        topicId,
        departmentId,
        title,
        deadline: high,
        priority: "Срочно",
      });
      await Reglaments.create({
        companyId,
        topicId,
        departmentId,
        title,
        deadline: incident,
        priority: "Критично",
      });
      res.sendStatus(201);
    } catch (errors) {
      res.status(500).send(errors);
    }
  },
  async edit(req, res) {
    try {
      const { id } = req.params;
      const reglaments = await Reglaments.findOne({
        where: {
          id,
        },
      });
      if (!reglaments) return res.sendStatus(404);
      await reglaments.update(req.body);
      res.send(reglaments);
    } catch (e) {
      res.status(401).send(e);
    }
  },
  async getAll(req, res) {
    try {
      const reglaments = await Reglaments.findAll({
        include: ["topic", "department", "company"],
      });
      if (!reglaments.length) return res.sendStatus(404);
      res.send(reglaments);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const reglaments = await Reglaments.findOne({ id });
      if (!reglaments) return res.sendStatus(404);
      res.send(reglaments);
    } catch (errors) {
      res.status(500).send(errors);
    }
  },
  async deleteRules(req, res) {
    try {
      const message = { message: "Delete successful" };
      await Reglaments.destroy({ where: { id: req.params.id } });
      return res.send(message);
    } catch (e) {
      res.status(401).send(e);
    }
  },
};
module.exports = ReglamentsController;
