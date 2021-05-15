const {Router} = require("express");
const auth = require("../../middlewares/auth");
const {Log} = require("../../../models")
const permit = require("../../middlewares/permit")
const LogsRouter = Router();


LogsRouter.get("/", [auth, permit("admin")], async (req, res) => {
    try {
        const allLogs = await Log.findAll()
        if (!allLogs.length) return res.sendStatus(404)
        res.send(allLogs)
    } catch (e) {
        console.error(e)
    }
})
module.exports = LogsRouter;
