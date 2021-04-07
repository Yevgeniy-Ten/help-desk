const { Router } = require("express");
const auth = require("../../middlewares/auth");
const ReglamentsController = require("./controllers/controllers");

const reglamentsRouter = Router();

reglamentsRouter.get("/", [auth], ReglamentsController.getAll);
reglamentsRouter.get("/:id", [auth], ReglamentsController.getById);
reglamentsRouter.post("/", [auth], ReglamentsController.createRules);
reglamentsRouter.put("/:id", [auth], ReglamentsController.edit);
reglamentsRouter.delete("/:id", [auth], ReglamentsController.deleteRules);


module.exports = reglamentsRouter;
