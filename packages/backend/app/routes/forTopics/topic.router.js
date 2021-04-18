const { Router } = require("express");
const TopicController = require("./controller/topicController");

const topicRoute = Router();

topicRoute.get("/", TopicController.getTopics);
topicRoute.post("/", TopicController.createTopic);
topicRoute.put("/:id", TopicController.editTopic);
// topicRoute.get("/:id/services", TopicController.getTopicServices)
// topicRoute.post("/:id/services", TopicController.createTopicServices)

module.exports = topicRoute;
