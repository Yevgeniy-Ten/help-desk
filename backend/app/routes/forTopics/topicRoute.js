const TopicContrroler = require("./controller/topicController")
const {Router} = require("express")

const topicRoute = Router()

topicRoute.get("/", TopicContrroler.getTopics)
topicRoute.post("/", TopicContrroler.createTopic)


module.exports = topicRoute