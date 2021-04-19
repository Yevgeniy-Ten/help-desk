const { nanoid } = require("nanoid");

module.exports = {
    saveFile: function (file, type) {
        const id = nanoid(10)
        const fileName = `uploads/${type}/${id}${file.name}`
        file.mv(fileName, function (err) {
            if (err) throw err;
            console.log("File uploaded");
        });
    },
};

const {RequestHistory} = require("../../models");
const hourWorkUpdate = (requests) => {
    requests.forEach(async request => {
        const histories = await RequestHistory.findAll({
            where: {
                requestId: request.id
            },
        })
        let hourWork = 0;
        const status = {
            open: "Открыто", 
            inProgress: "Выполняется", 
            suspend: "Приостановлено", 
            done: "Выполнено"
        }
        for(let i = 0; i < histories.length; i++) {
            console.log("addHourWork", histories[i].addHourWork)
            if(histories[i].addHourWork > 0) {
                hourWork += histories[i].addHourWork;
            }
            if(histories[i].status !== status.inProgress) {
                continue;
            }
            let currentDate = new Date();
            if(histories[i].status === status.inProgress && i + 1 >= histories.length) {
                hourWork += currentDate - histories[i].updatedAt;
            }
            for(let j = i + 1; j < histories.length; j++) {
                if(histories[i].status === status.inProgress && (histories[j].status === status.inProgress || histories[j].status === status.suspend || histories[j].status === status.done)) {
                    hourWork += histories[j].updatedAt - histories[i].updatedAt;
                    break;
                }
            }
        }
        await request.update({
            hourWork
        })
    });
    
    return requests;
};

module.exports = hourWorkUpdate;
