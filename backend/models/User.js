"use strict";
const bcrypt = require("bcryptjs")
const {nanoid} = require("nanoid")
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate({Appeal, Ticket, Topic}) {
            // имеет много общащений, обращения связываются через userId
            this.hasMany(Appeal,
                {
                    foreignKey: "userId",
                    as: "appeals"
                })

        }

        toJSON() {
            return {...this.get(), password: undefined}
        }
    };
    User.init({
        token: DataTypes.STRING,
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "client"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: DataTypes.STRING
    }, {
        sequelize,
        modelName: "User",
        tableName: "users"
    });
    User.beforeCreate((user) => {
        return bcrypt.hash(user.password, 10)
            .then(hashPass => {
                user.password = hashPass
            })
            .catch(err => {
                throw new Error(err)
            });
    })
    User.prototype.checkPassword = function (password) {
        return bcrypt.compare(password, this.password)
    };
    User.prototype.generateToken = function (password) {
        this.token = nanoid()
    }
    return User;
};