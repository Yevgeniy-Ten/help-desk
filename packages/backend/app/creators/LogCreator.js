const {Log} = require("../../models")

module.exports = {
    types: {
        SYSTEM_CRASHING: "СИСТЕМА УПАЛА",
        USER_ERROR: "ПОЛЬЗОВАТЕЛЬСКАЯ ОШИБКА",
        SUCCESS_ACTION: "УСПЕШНОЕ ВЗАИМОДЕЙСТВИЕ",
    },
    async createUserErrorLog(username, actionType, error) {
        try {
            await Log.create({
                actionType: this.types.USER_ERROR,
                username,
                description: `when ${actionType} error has occured: ${error}`
            })
        } catch (error) {
            await this.createSystemCrashLog("when create system log", error)
        }
    },
    async createSuccessLog(username, actionType) {
        try {
            await Log.create({
                actionType: this.types.SUCCESS_ACTION,
                username,
                description: `${actionType} is success working!`
            })
        } catch (error) {
            await Log.create({
                actionType: this.types.SYSTEM_CRASHING,
                description: error,
            })
        }
    },
    async createSystemCrashLog(actionType, description) {
        try {
            await Log.create({
                actionType,
                description,
            })
        } catch (error) {
            await Log.create({
                actionType: this.types.SYSTEM_CRASHING,
                description: error,
            })
        }
    }
}
