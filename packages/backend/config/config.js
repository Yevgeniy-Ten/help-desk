require("dotenv").config()
// "127.0.0.1"
module.exports = {
    "development": {
        "username": process.env.MYSQL_USER || "esdp-user",
        "password": process.env.MYSQL_PASSWORD || "esdp-user",
        "database": process.env.MYSQL_DATABASE || "database_esdp",
        "host": process.env.MYSQL_HOST || "127.0.0.1",
        "dialect": "mysql",
        "logging": true,
        port: process.env.MYSQL_PORT || 3306
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
