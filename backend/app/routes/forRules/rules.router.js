const { Router } = require("express");
const auth = require("../../middlewares/auth");
const RulesController = require("./controllers/controllers");

const rulesRouter = Router();

rulesRouter.get("/", [auth], RulesController.getAll);
rulesRouter.get("/:id", [auth], RulesController.getById);
rulesRouter.post("/", [auth], RulesController.createRules);
rulesRouter.put("/:id", [auth], RulesController.edit);
rulesRouter.delete("/:id", [auth], RulesController.deleteRules);


module.exports = rulesRouter;
