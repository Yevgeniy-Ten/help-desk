const { Topic, Reglaments, Solution } = require("../../../../models");

const TopicController = {
  async getTopics(req, res) {
    try {
      const topics = await Topic.findAll();
      if (!topics.length) return res.sendStatus(404);
      res.send(topics);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  async editTopic(req, res) {
    try {
      const { id } = req.params;
      const topic = await Topic.findOne({
        where: {
          id
        }
      });
      if (!topic) return res.sendStatus(404);
      await topic.update(req.body);
      res.send(topic);
    } catch (e) {
      res.status(401).send(e);
    }
  },
  async getSolutions(req, res) {
    const { id } = req.params;

    let roleUser = 2;
    if (req.user) {
      roleUser = req.user.roleId;
    }

    const solutions =
      roleUser !== 1
        ? await Solution.findAll({
            where: {
              id,
              privateForUser: false
            }
          })
        : await Solution.findAll({
            where: {
              id
            }
          });
    if (!solutions.length) return res.sendStatus(404);
    res.send(solutions);
  },
  async getAllSolutions(req, res) {
    let roleUser = 2;
    if (req.user) {
      roleUser = req.user.roleId;
    }
    const solutions =
      roleUser !== 1
        ? await Solution.findAll({
            where: {
              privateForUser: false
            }
          })
        : await Solution.findAll({
            where: {
              id
            }
          });
    if (!solutions.length) return res.sendStatus(404);
    res.send(solutions);
  },
  async createTopicSolution(req, res) {
    const {
      privateForUser,
      questionTitle,
      answer,
      videoPath,
      topicId
    } = req.body;
    if (privateForUser && req.user.role !== 1) {
      return res.sendStatus(403);
    }
    let videoPathCopy;
    if (!videoPath) {
      videoPathCopy = false;
    }
    Solution.create({
      topicId,
      privateForUser,
      questionTitle,
      answer,
      videoPathCopy
    }).then((result) => res.status(201).send(result));
  },
  async createTopic(req, res) {
    const { title, departmentId, standart, middle, high, incident } = req.body;
    // console.log(req.body);
    const titleCopy = `Регламент для ${title}`;
    Topic.create({
      title
    })
      .then((newTopic) => {
        if (departmentId) {
          Reglaments.create({
            topicId: newTopic.dataValues.id,
            priority: "Стандартно",
            title: titleCopy,
            deadline: standart,
            departmentId
          });
          Reglaments.create({
            topicId: newTopic.dataValues.id,
            priority: "Средний",
            title: titleCopy,
            deadline: middle,
            departmentId
          });
          Reglaments.create({
            topicId: newTopic.dataValues.id,
            priority: "Срочно",
            title: titleCopy,
            deadline: high,
            departmentId
          });
          Reglaments.create({
            topicId: newTopic.dataValues.id,
            priority: "Критично",
            title: titleCopy,
            deadline: incident,
            departmentId
          });
        }
        return res.status(201).send(newTopic);
      })
      .catch((errors) => {
        res.status(400).send(errors);
      });
  }
  // async getTopicServices(req, res) {
  //     const { id: topicId } = req.params
  //     const servicesByTopic = await ServicesTopic.findAll({
  //         where: {
  //             topicId
  //         }
  //     })
  //     if (!servicesByTopic) return res.sendStatus(404)
  //     res.send(servicesByTopic)
  // },
  // async createTopicServices(req, res) {
  //     try {
  //         const { id: topicId } = req.params
  //         const topic = await Topic.findOne({
  //             where: {
  //                 id: topicId
  //             }
  //         })
  //         if (!topic) return res.sendStatus(400)
  //         const { name } = req.body
  //         ServicesTopic.create({ name, topicId }).then(newServiceTopic => {
  //             res.status(201).send(newServiceTopic)
  //         }).catch(errors => {
  //             res.status(400).send(errors)
  //         })
  //     } catch (e) {
  //         res.status(e).send(e)
  //     }
  // },
};

module.exports = TopicController;
