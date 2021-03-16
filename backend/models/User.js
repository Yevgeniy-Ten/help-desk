"use strict";
const bcrypt = require("bcryptjs")
const {nanoid} = require("nanoid")
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate({Appeal, TopicDepartment, UserRole, TicketTask}) {
            // имеет много общащений, обращения связываются через userId
            this.hasMany(Appeal,
                {
                    foreignKey: "userId",
                    as: "appeals"
                })
            // принадлежит к какой-то роли
            this.belongsTo(UserRole, {
                foreignKey: "roleId",
                as: "role"
            })
            // привязан к одному отделу, а может и не привязан
            this.belongsTo(TopicDepartment, {
                foreignKey: "departmentId",
                as: "department"
            })
            // имеет много задач если он сотрудник
            this.hasMany(TicketTask, {
                foreignKey: "employeeId",
                as: "employeeTasks"
            })
        }

        toJSON() {
            return {...this.get(), password: undefined}
        }
    };
    User.init({
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
            allowNull: false,
            validate: {
                isEmail: { msg: "Пожалуйста введите корректную почту" },
                async checkUnique(email) {
                  const user = await User.findOne({ where: { email } });
                  if (user) throw new Error("Данная почта уже используется");
                },
              },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: DataTypes.STRING,
        departmentId: {
            type: DataTypes.INTEGER,
        },
        roleId: {
            type: DataTypes.INTEGER,
        }
    }, {
        sequelize,
        timestamps: false,
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