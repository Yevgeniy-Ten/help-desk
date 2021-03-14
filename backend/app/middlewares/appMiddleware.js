const express = require("express");
const cors = require("cors");
const {webURL} = require("../../config/general.config")
const fileUpload = require("express-fileupload");

const corsOptions = {
    origin: webURL,
    optionSuccessStatus: 200,
    credentials: true
};

module.exports = [
    fileUpload({createParentPath: true}),
    express.json(),
    cors(corsOptions),
    express.static("public"),
];
