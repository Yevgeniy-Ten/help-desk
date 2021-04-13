const express = require("express");
const {create, edit, getAll, getById, getRequestHistory,getRequestsAudit} = require("./controllers/controllers");
const auth = require("../../middlewares/auth")
const appealRouter = express.Router();
appealRouter.get("/", auth, getAll);
appealRouter.get("/history",  getRequestHistory);
appealRouter.get("/audit",  getRequestsAudit);
appealRouter.get("/:id", auth, getById);
appealRouter.post("/", auth, create);
appealRouter.put("/:id", auth, edit);


module.exports = appealRouter;
