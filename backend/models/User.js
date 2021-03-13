"use strict";
const bcrypt = require("bcryptjs")
const {nanoid} = require("nanoid")
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate({Appeal, TopicDepartment, UserRole}) {
            // имеет много общащений, обращения связываются через userId
            this.hasMany(Appeal,
                {
                    foreignKey: "userId",
                    as: "appeals"
                })
            // имеет одну роль которая связана через userId
            this.hasOne(UserRole, {
                foreignKey: "userId",
                as: "role"
            })
            // привязан к одному отделу, а может и не привязан
            this.belongsTo(TopicDepartment, {
                foreignKey: "departmentId",
                as: "department"
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
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        departmentId: {
            type: DataTypes.INTEGER,
        },
        photo: DataTypes.STRING,
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

    User.prototype.generateToken = function (password) {
        this.token = nanoid()
    }
    return User;
};