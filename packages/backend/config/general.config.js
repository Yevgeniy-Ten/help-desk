require("dotenv").config();

// webURL: `http://localhost:${process.env.FRONT_PORT || 3000}`,

// webURL: `http://${process.env.FRONT_HOST || "localhost"}:${process.env.FRONT_PORT || 3000}`, при таком назначении видимо надо подключать nginx поэтому общение идет через мой компьютер
const HOST = `http://${process.env.FRONT_HOST || "localhost"}`
module.exports = {
    facebook: {
        appID: "",
        appSecret: "",
    },
    constants: [],
    backUrl: `${HOST}:${process.env.BACK_PORT || 3003}`,
    webURL: `${HOST}:${
        process.env.FRONT_PORT || 3000
    }`,
};
