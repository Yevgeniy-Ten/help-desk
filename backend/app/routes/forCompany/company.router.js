const express = require("express");
const { createCompany, editCompany, get, getById } = require("./controllers/controllers");
const auth = require("../../middlewares/auth")
const appealRouter = express.Router();
appealRouter.get("/", auth, get);
appealRouter.get("/:id", auth, getById);
appealRouter.post("/", auth, createCompany);
appealRouter.put("/:id", auth, editCompany);


module.exports = appealRouter;
