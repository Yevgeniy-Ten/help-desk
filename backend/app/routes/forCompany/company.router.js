const express = require("express");
const { createCompany, editCompany, get, getById, deleteCompany } = require("./controllers/controllers");
const auth = require("../../middlewares/auth")
const companyRouter = express.Router();
companyRouter.get("/", auth, get);
companyRouter.get("/:id", auth, getById);
companyRouter.post("/", auth, createCompany);
companyRouter.put("/:id", auth, editCompany);
companyRouter.delete("/:id", auth, deleteCompany);


module.exports = companyRouter;
