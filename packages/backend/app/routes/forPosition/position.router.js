const { Router } = require("express");
const auth = require("../../middlewares/auth");
const PositionController = require("./controllers/controllers");

const positionRouter = Router();

positionRouter.get("/", [auth], PositionController.getAllPosition);
positionRouter.get("/:id", [auth], PositionController.getById);
positionRouter.post("/", [auth], PositionController.create);
positionRouter.put("/:id", [auth], PositionController.edit);
positionRouter.delete("/:id", [auth], PositionController.deletePosition);


module.exports = positionRouter;
