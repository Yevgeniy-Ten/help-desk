const excel = require("exceljs");
const {
  RequestHistory,
  User,
  Company,
  OrgStructure,
  Position,
  Reglaments,
  Request,
  Topic,
  RequestTask,
  sequelize,
} = require("../../../../models");

const ReportingControllers = {
  async getRequestHistory(req, res) {
    try {
      const arrayModelsName = [
        "User",
        "Company",
        "RequestHistory",
        "OrgStructure",
        "Position",
        "Reglaments",
        "Request",
        "Topic",
      ];
      const arrayModels = [
        User,
        Company,
        RequestHistory,
        OrgStructure,
        Position,
        Reglaments,
        Request,
        Topic,
      ];
      const workbook = new excel.Workbook();

      for (let i = 0; i < arrayModelsName.length; i++) {
        arrayModels[i].findAll({ raw: true }).then((objData) => {
          const worksheet = workbook.addWorksheet(arrayModelsName[i]);
          const columns = [];
          Object.keys(objData[0]).forEach((key) => {
            columns.push({ header: key.toUpperCase(), key, width: 30 });
          });
          worksheet.columns = columns;
          worksheet.addRows(objData);

          worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            if (rowNumber === 1) {
              for (let i = 1; i < Object.keys(objData).length; i++) {
                row.getCell(i).fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "FFFF7D7D" },
                  bgColor: { argb: "FF000000" },
                };
                row.getCell(i).border = {
                  top: { style: "double" },
                  left: { style: "double" },
                  bottom: { style: "double" },
                  right: { style: "double" },
                };
              }
            }
          });

          // for(let i=0;i<worksheet.columns.length-1;i++) {
          //   worksheet.columns[i].width  = worksheet.columns[i].header.length <12 ?12:worksheet.columns[i].header.length
          // }

          if (i === arrayModelsName.length - 1) {
            const worksheet = workbook.addWorksheet("АУДИТ");

            const requestPriority = [
              "Стандартно",
              "Критично",
              "Средний",
              "Срочно",
            ];
            async function somefun() {
              const response = await sequelize.query(
                `SELECT priority, COUNT(*) as COUNTER
                FROM request
                GROUP BY priority;`,
                { raw: true, type: sequelize.QueryTypes.SELECT }
              );
              worksheet.columns = [
                { header: "Status", key: "priority", width: 10 },
                { header: "Count", key: "COUNTER", width: 10 },
              ];
              worksheet.addRows(response);
              res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              );
              res.setHeader(
                "Content-Disposition",
                "attachment;filename=" + "tutorials.xlsx"
              );

              return workbook.xlsx.write(res).then(() => {
                res.status(200).end();
              });
            }
            somefun();
          }
        });
      }
    } catch (err) {
      console.log(`this is the error, ${err}`);
    }
  },
};
module.exports = ReportingControllers;
