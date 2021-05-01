const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { webURL } = require("../../config/general.config");
const fileUpload = require("express-fileupload");
const { sequelize } = require("../../models");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const corsOptions = {
  origin: webURL,
  optionSuccessStatus: 200,
  credentials: true,
  withCredentials: true,
};

module.exports = [
  cookieparser(),
  session({
    secret: "cat",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      domain: process.env.HOST || "localhost",
    },
  }),
  fileUpload({ createParentPath: true }),
  express.json(),
  cors(corsOptions),
  express.static("public"),
];
