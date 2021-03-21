const { Router } = require("express");
const auth = require("../../middlewares/auth");
const DepartmentController = require("./controllers/controllers");

const departmentRouter = Router();

departmentRouter.get("/", [auth], DepartmentController.getAllDepartment);
departmentRouter.get("/:id", [auth], DepartmentController.getById);
departmentRouter.post("/", [auth], DepartmentController.create);
departmentRouter.put("/:id", [auth], DepartmentController.edit);
departmentRouter.delete("/:id", [auth], DepartmentController.deleteDepartment);


module.exports = departmentRouter;
