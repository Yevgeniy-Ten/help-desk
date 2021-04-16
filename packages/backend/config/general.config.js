require("dotenv").config()


// webURL: `http://${process.env.FRONT_HOST || "localhost"}:${process.env.FRONT_PORT || 3000}`, при таком назначении видимо надо подключать nginx поэтому общение идет через мой компьютер

module.exports = {
    facebook: {
        appID: "",
        appSecret: "",
    },
    constants: [],
    webURL: `http://localhost:${process.env.FRONT_PORT || 3000}`,
};