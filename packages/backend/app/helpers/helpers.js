const { nanoid } = require("nanoid");
const { RequestHistory, Request } = require("../../models");
module.exports = {
    saveFile(file, type) {
        const id = nanoid(10);
        const fileName = `uploads/${type}/${id}${file.name}`;
        file.mv(fileName, (err) => {
            if (err) throw err;
            console.log("File uploaded");
        });
    },
    buildQuery(query, priority) {
        const whereClause = {};

        if (query && query.id) {
            whereClause.id = query.id;
        }
        if (query && query.requestId) {
            whereClause.requestId = query.requestId;
        }
        if (priority) {
            whereClause.priority = priority;
        }
        if (query && query.status) {
            whereClause.status = query.status;
        }
        if (query && query.departmentId) {
            whereClause.departmentId = query.departmentId;
        }
        if (query && query.date) {
            // whereClause.date = query.date;
        }

        return whereClause;
    },
    async hourWorkEmployeeCalc(employeeId) {
        let hourWork = 0;
        let requests = await Request.findAll();
        const status = {
            open: "Открыто",
            inProgress: "Выполняется",
            suspend: "Приостановлено",
            done: "Выполнено",
        };
        for (let request of requests) {
            let hourWorkHistory = 0;
            const histories = await RequestHistory.findAll({
                where: {
                    requestId: request.id,
                },
            });
            for (let i = 0; i < histories.length; i++) {
                const currentDate = new Date();
                if (
                    histories[i].employeeId === employeeId &&
                    histories[i].status === status.inProgress &&
                    i + 1 >= histories.length
                ) {
                    hourWorkHistory += currentDate - histories[i].updatedAt;
                }
                for (let j = i + 1; j < histories.length; j++) {
                    if(histories[i].employeeId === employeeId) {
                        hourWorkHistory += histories[j].hourWork - histories[i].hourWork;
                    }
                    break;
                }
            }
            hourWork += hourWorkHistory;
        };
        return hourWork;
    },
    hourWorkUpdate(requests) {
        requests.forEach(async (request) => {
            const histories = await RequestHistory.findAll({
                where: {
                    requestId: request.id,
                },
            });
            let hourWork = 0;
            const status = {
                open: "Открыто",
                inProgress: "Выполняется",
                suspend: "Приостановлено",
                done: "Выполнено",
            };
            for (let i = 0; i < histories.length; i++) {
                if (histories[i].addHourWork > 0) {
                    hourWork += histories[i].addHourWork;
                }
                if (histories[i].status !== status.inProgress) {
                    continue;
                }
                const currentDate = new Date();
                if (
                    histories[i].status === status.inProgress &&
                    i + 1 >= histories.length
                ) {
                    hourWork += currentDate - histories[i].updatedAt;
                }
                for (let j = i + 1; j < histories.length; j++) {
                    if (
                        histories[i].status === status.inProgress &&
                        (histories[j].status === status.inProgress ||
                            histories[j].status === status.suspend ||
                            histories[j].status === status.done)
                    ) {
                        hourWork += histories[j].updatedAt - histories[i].updatedAt;
                        break;
                    }
                }
            }
            await request.update({
                hourWork,
            });
        });
        return requests;
    },
};
