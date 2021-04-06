"use strict";
const bcrypt = require("bcryptjs")
const { nanoid } = require("nanoid")
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate({ Request, Department, UserRole, Company, OrgStructure, TicketTask }) {
            // имеет много обращений, обращения связываются через userId
            this.hasMany(Request, {
                foreignKey: "clientId",
                as: "clientRequest"
            });
            // имеет много обращений, обращения связываются через userId
            this.hasMany(Request, {
                foreignKey: "employeeId",
                as: "employeeRequest"
            });
            // принадлежит к какой-то роли
            this.belongsTo(UserRole, {
                foreignKey: "roleId",
                as: "role"
            });
            // принадлежит к какой-то компаний, связываются через companyId
            this.belongsTo(Company, {
                foreignKey: "companyId",
                as: "company"
            });
            // привязан к одному отделу, а может и не привязан
            this.belongsTo(Department, {
                foreignKey: "departmentId",
                as: "departmentUser"
            });
            this.belongsTo(OrgStructure, {
                foreignKey: "orgStructureId",
                as: "orgStreId"
            });
            // имеет много задач если он сотрудник
            // this.hasMany(TicketTask, {
            //     foreignKey: "employeeId",
            //     as: "employeeTasks"
            // })
        }

        toJSON() {
            return { ...this.get(), password: undefined }
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
        phoneNumber: DataTypes.STRING,
        orgStructureId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        roleId: {
            type: DataTypes.INTEGER,
        },
        isAuthorized: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        // isEmployee: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false
        // },
        companyId: {
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