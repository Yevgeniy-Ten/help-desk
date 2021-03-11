const express = require("express");
const {create, edit, getAll} = require("./controllers/controllers");
const auth = require("../../middlewares/auth")

const appealRouter = express.Router();
appealRouter.get("/", auth, getAll);
appealRouter.get("/:id", auth, getById);
appealRouter.post("/", auth, create);
appealRouter.put("/:id", auth, edit);


module.exports = appealRouter;
