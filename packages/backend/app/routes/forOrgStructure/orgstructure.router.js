const { Router } = require("express");
const auth = require("../../middlewares/auth");
const OrgStructureController = require("./controllers/controllers");

const orgStructureRouter = Router();

orgStructureRouter.get("/", [auth], OrgStructureController.getAllOrgStructure);
orgStructureRouter.get("/:id", [auth], OrgStructureController.getById);
orgStructureRouter.post("/", [auth], OrgStructureController.create);
orgStructureRouter.put("/:id", [auth], OrgStructureController.edit);
orgStructureRouter.delete(
  "/:id",
  [auth],
  OrgStructureController.deleteOrgStructure
);

module.exports = orgStructureRouter;
