const express = require("express");
const {create, edit, getAll, getById, getRequestHistory} = require("./controllers/controllers");
const auth = require("../../middlewares/auth")
const appealRouter = express.Router();
appealRouter.get("/", auth, getAll);
appealRouter.get("/:id", auth, getById);
appealRouter.get("/history/:id", auth, getRequestHistory);
appealRouter.post("/", auth, create);
appealRouter.put("/:id", auth, edit);


module.exports = appealRouter;
