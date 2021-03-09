const express = require("express");
const {create, edit, get} = require("./controllers/controllers");
const auth = require("../../middlewares/auth")

const appealRouter = express.Router();
appealRouter.get("/", auth, get);
appealRouter.post("/", auth, create);
appealRouter.put("/:id", auth, edit);


module.exports = appealRouter;
