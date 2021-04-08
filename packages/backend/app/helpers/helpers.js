const {nanoid} = require("nanoid")
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