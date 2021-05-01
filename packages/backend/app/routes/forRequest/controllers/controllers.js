const moment = require("moment");
const {
  Request,
  Reglaments,
  OrgStructure,
  User,
  RequestHistory,
  Company,
} = require("../../../../models");
const helpers = require("../../../helpers/helpers");

module.exports = {
  async create(req, res) {
    try {
      const {
        clientId,
        topicId,
        priority,
        status,
        title,
        description,
      } = req.body;
      const client = await User.findOne({
        where: {
          id: clientId || req.user.id,
        },
      });
      // если клиент найден то присваеиваем companyId клиента, если не найден берем companyId юзера который создает запрос
      const companyId = client
        ? client.companyId
        : req.user.companyId && req.user.companyId;
      let rule = await Reglaments.findOne({
        where: { topicId, priority, companyId },
      });
      if (!rule) {
        rule = await Reglaments.findOne({
          where: {
            topicId,
            priority,
            companyId: null,
          },
        });
      }
      if (!rule)
        return res
          .status(404)
          .send({ message: "Обратитесь к поставщику услуг, по регламентам" });
      const { deadline } = rule;
      const { departmentId } = rule;
      const orgStructure = await OrgStructure.findOne({
        where: {
          departmentId,
          isMain: true,
        },
      });
      let employee = null;
      if (orgStructure) {
        employee = await User.findOne({
          where: {
            orgStructureId: orgStructure.id,
          },
        });
      }
      Request.create({
        clientId: client.id,
        topicId,
        priority,
        status,
        title,
        description,
        deadline,
        departmentId,
        employeeId: employee && employee.id,
      })
        .then(async (newRequest) => {
          await RequestHistory.create({
            requestId: newRequest.dataValues.id,
            topicId,
            priority,
            status,
            deadline: newRequest.dataValues.deadline,
            departmentId: newRequest.dataValues.departmentId,
            employeeId: newRequest.dataValues.departmentId,
            hourWork: newRequest.dataValues.hourWork,
            comment: "Заявка создана!",
          });
          res.status(201).send(newRequest);
        })
        .catch((errors) => {
          res.status(400).send(errors);
        });
    } catch (errors) {
      res.status(500).send(errors);
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const request = await Request.findOne({
        where: { id },
        include: [
          {
            model: User,
            as: "clientRequest",
            attributes: ["firstName", "lastName", "companyId"],
          },
          {
            model: User,
            as: "employeeRequest",
            attributes: ["firstName", "lastName", "companyId"],
          },
          "topic",
          "department",
        ],
      });
      if (!request) return res.sendStatus(404);
      requestUpdate = helpers.hourWorkUpdate([request]);
      res.send(requestUpdate[0]);
    } catch (errors) {
      res.status(500).send(errors);
    }
  },
  async getRequestHistory(req, res) {
    try {
      const { requestId } = req.query;
      const { date } = req.query;
      let histories = [];
      if (requestId || date) {
        histories = await RequestHistory.findAll({
          where: helpers.buildQuery(req.query, null),
        });
        return res.send(histories);
      }
      histories = await RequestHistory.findAll({
        order: [["requestId", "ASC"]],
      });
      if (!histories.length) return res.sendStatus(404);
      res.send(histories);
    } catch (errors) {
      res.status(500).send(errors);
    }
  },
  async getRequestsAudit(req, res) {
    let audit = await Company.findAll({
      include: [
        {
          model: User,
          as: "users",
          include: ["clientRequest"],
        },
      ],
    });
    audit = audit.reduce((a, companyWithUsers) => {
      const companyInfo = {
        name: companyWithUsers.title,
        users: companyWithUsers.users.length,
      };
      // company {users:[user: clientRequest:[ ]  }
      const requests = companyWithUsers.users.reduce(
        (requestReport, user) => {
          if (!user.clientRequest.length) return requestReport;
          requestReport.count += user.clientRequest.length;
          for (request of user.clientRequest) {
            switch (request.priority) {
              case "Стандартно":
                requestReport.priority.standart += 1;
                break;
              case "Критично":
                requestReport.priority.critical += 1;
                break;
              case "Средний":
                requestReport.priority.medium += 1;
                break;
              case "Срочно":
                requestReport.priority.urgent += 1;
                break;
            }
            switch (request.status) {
              case "Открыто":
                requestReport.status.open += 1;
                break;
              case "Выполняется":
                requestReport.status.inProgress += 1;
                break;
              case "Приостановлено":
                requestReport.status.suspend += 1;
                break;
              case "Выполнено":
                requestReport.status.done += 1;
                break;
            }
          }
          return requestReport;
        },
        {
          count: 0,
          status: {
            open: 0,
            inProgress: 0,
            suspend: 0,
            done: 0,
          },
          priority: {
            standart: 0,
            medium: 0,
            urgent: 0,
            critical: 0,
          },
        }
      );
      companyInfo.requests = requests;
      a.push(companyInfo);
      return a;
    }, []);
    res.send(audit);
  },
  async edit(req, res) {
    try {
      const {
        topicId,
        priority,
        status,
        deadline,
        departmentId,
        hourWork,
        minuteWork,
        secondWork,
        comment: employeeComment,
        employeeId,
      } = req.body;
      let milliseconds = 0;
      if (hourWork || minuteWork || secondWork) {
        milliseconds =
          hourWork * 3600000 + minuteWork * 60000 + secondWork * 1000;
      }
      const { id } = req.params;
      const request = await Request.findOne({
        where: { id },
      });
      if (!request) return res.sendStatus(404);
      const addHourWork = request.hourWork + milliseconds;
      const prevRequest = { ...request.dataValues };
      await request.update({
        topicId,
        priority,
        status,
        deadline,
        departmentId,
        hourWork: addHourWork,
        employeeId,
      });
      const comment = Object.keys(request.dataValues).reduce((comment, key) => {
        if (
          request.dataValues[key] !== prevRequest[key] &&
          key !== "createdAt" &&
          key !== "updatedAt"
        ) {
          comment += `${key} сменился c ${
            prevRequest[key]
          } на ${request.getDataValue(key)} \n`;
        }
        return comment;
      }, `${employeeComment ? `${employeeComment}\n` : ""}`);
      delete request.dataValues.id;
      await RequestHistory.create({
        requestId: id,
        comment,
        addHourWork: milliseconds,
        ...request.dataValues,
      });
      res.sendStatus(200);
    } catch (e) {
      res.status(401).send(e);
    }
  },
  async getAll(req, res) {
    try {
      const requests = [];
      const priorities = ["Критично", "Срочно", "Средний", "Стандартно"];
      let requestsByPriority = [];

      const { id: requestId } = req.query;
      const { priority } = req.query;

      if (req.user.roleId !== 2) {
        if (requestId) {
          const request = await Request.findAll({
            where: helpers.buildQuery(req.query, priority),
            include: [
              {
                model: User,
                as: "clientRequest",
                attributes: ["firstName", "lastName", "companyId"],
              },
              {
                model: User,
                as: "employeeRequest",
                attributes: ["firstName", "lastName", "companyId"],
              },
              "topic",
              "department",
            ],
          });
          return res.send(request);
        }
        if (priority) {
          const requests = await Request.findAll({
            where: helpers.buildQuery(req.query, priority),
            include: [
              {
                model: User,
                as: "clientRequest",
                attributes: ["firstName", "lastName", "companyId"],
              },
              {
                model: User,
                as: "employeeRequest",
                attributes: ["firstName", "lastName", "companyId"],
              },
              "topic",
              "department",
            ],
          });
          return res.send(requests);
        }
        for (let index = 0; index < priorities.length; index++) {
          requestsByPriority = await Request.findAll({
            where: helpers.buildQuery(req.query, priorities[index]),
            include: [
              {
                model: User,
                as: "clientRequest",
                attributes: ["firstName", "lastName", "companyId"],
              },
              {
                model: User,
                as: "employeeRequest",
                attributes: ["firstName", "lastName", "companyId"],
              },
              "topic",
              "department",
            ],
          });
          requestsByPriority.forEach((request) => {
            requests.push(request);
          });
        }
      } else {
        if (requestId) {
          const request = await Request.findAll({
            where: helpers.buildQuery(req.query, null),
            include: [
              {
                model: User,
                as: "clientRequest",
                attributes: ["firstName", "lastName", "companyId"],
              },
              {
                model: User,
                as: "employeeRequest",
                attributes: ["firstName", "lastName", "companyId"],
              },
              "topic",
              "department",
            ],
          });
          return res.send(request);
        }
        for (let index = 0; index < priorities.length; index++) {
          requestsByPriority = await Request.findAll({
            where: {
              clientId: req.user.id,
              priority: priorities[index],
            },
            include: [
              {
                model: User,
                as: "clientRequest",
                attributes: ["firstName", "lastName", "companyId"],
              },
              {
                model: User,
                as: "employeeRequest",
                attributes: ["firstName", "lastName", "companyId"],
              },
              "topic",
              "department",
            ],
          });
          requestsByPriority.forEach((request) => {
            requests.push(request);
          });
        }
      }
      if (!requests.length) return res.sendStatus(404);
      requestUpdate = helpers.hourWorkUpdate(requests);
      res.send(requestUpdate);
    } catch (errors) {
      res.status(500).send(errors);
    }
  },
  async deleteRequest(req, res) {
    try {
      if (req.body) {
        let idAppealsArr = [];
        idAppealsArr = req.body;
        if (Array.isArray(idAppealsArr)) {
          idAppealsArr.forEach(async (element) => {
            //       await RequestHistory.create({
            //         requestId: element.id,
            //         topicId: element.topicId,
            //         priority: element.status,
            //         status: element.status,
            //         deadline: element.deadline,
            //         departmentId: element.departmentId,
            //         employeeId: element.employeeId,
            //         hourWork: element.hourWork,
            //         comment:
            //           "Заявка удалена!" +
            //           "\n" +
            //           `со статусом ${element.status}` +
            //           "\n" +
            //           "Удалил:" +
            //           "\n" +
            //           req.user.firstName +
            //           "\n" +
            //           req.user.lastName
            // });
            await Request.destroy({ where: { id: element.id } });
          });
          return res.send({ message: "Заявки удалены!" });
        }
      }
      // const request = await Request.findOne({
      //   where: { id: req.params.id }
      // });
      // if (!request) return res.sendStatus(404);

      // await RequestHistory.create({
      //   requestId: request.id,
      //   topicId: request.topicId,
      //   priority: request.priority,
      //   status: request.status,
      //   deadline: request.deadline,
      //   departmentId: request.departmentId,
      //   employeeId: request.employeeId,
      //   hourWork: request.hourWork,
      //   comment: `Заявка удалена!\n
      //     со статусом ${request.status}\n
      //     Удалил:\n
      //     ${req.user.firstName}\n
      //     ${req.user.lastName}`
      // });

      await Request.destroy({ where: { id: req.params.id } });
      return res.send({ message: "Заявка удалена!" });
    } catch (e) {
      res.status(401).send(e);
    }
  },
};
