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
        priority
      } = req.body;
      await Reglaments.create({
        companyId,
        topicId,
        departmentId,
        title,
        deadline: standart,
        priority: "Стандартно"
      });
      await Reglaments.create({
        companyId,
        topicId,
        departmentId,
        title,
        deadline: middle,
        priority: "Средний"
      });
      await Reglaments.create({
        companyId,
        topicId,
        departmentId,
        title,
        deadline: high,
        priority: "Срочно"
      });
      await Reglaments.create({
        companyId,
        topicId,
        departmentId,
        title,
        deadline: incident,
        priority: "Критично"
      });
      res.sendStatus(201);
    } catch (errors) {
      res.status(500).send(errors);
    }
  },
  async editReglaments(req, res) {
    try {
      const { id } = req.params;
      const reglament = await Reglaments.findOne({
        where: { id }
      });
      if (!reglament) return res.sendStatus(404);
      const reglamentIsExist = await Reglaments.findOne({
        where: {
          topicId: req.body.topicId,
          companyId: req.body.companyId
        }
      });
      if (reglamentIsExist.topicId !== reglament.topicId) {
        return res.status(400).json({ message: "Регламент уже существует" });
      }
      const reglaments = await Reglaments.findAll({
        where: {
          companyId: reglament.companyId ? reglament.companyId : null,
          topicId: reglament.topicId,
          departmentId: reglament.departmentId
        }
      });
      if (!reglaments.length) return res.sendStatus(404);
      for (const reg of reglaments) {
        switch (reg.priority) {
          case "Срочно":
            // eslint-disable-next-line no-await-in-loop
            await reg.update({
              ...req.body,
              priority: "Срочно",
              deadline: req.body.high
            });
            break;
          case "Критично":
            // eslint-disable-next-line no-await-in-loop
            await reg.update({
              ...req.body,
              priority: "Критично",
              deadline: req.body.incident
            });
            break;
          case "Средний":
            // eslint-disable-next-line no-await-in-loop
            await reg.update({
              ...req.body,
              priority: "Средний",
              deadline: req.body.middle
            });
            break;
          default:
            // eslint-disable-next-line no-await-in-loop
            await reg.update({
              ...req.body,
              priority: "Стандартно",
              deadline: req.body.standart
            });
        }
      }
      return res.sendStatus(200);
    } catch (e) {
      return res.status(401).send(e);
    }
  },
  async getAll(req, res) {
    try {
      const reglaments = await Reglaments.findAll({
        include: ["topic", "department", "company"]
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
      const reglaments = await Reglaments.findOne({
        where: {
          id
        }
      });
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
  }
};
module.exports = ReglamentsController;
