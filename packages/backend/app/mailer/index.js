const nodemailer = require("nodemailer");
const messageTypes = require("./messageTypes");
const { MailMessage } = require("../../models");
const LogCreator = require("../creators/LogCreator");

const MessageSender = {
  transporter: null,
  connect() {
    try {
      this.transporter = nodemailer.createTransport({
        service: "esdp",
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
          user: "ten.djenia@mail.ru",
          pass: "ouhoXO21vWdWDYOG0Fhg"
        }
      });
    } catch (e) {
      console.error(e);
    }
  },
  async sendVerifyMessage(email, link) {
    if (!this.transporter) return;
    try {
      const message = await MailMessage.findOne({
        where: {
          type: messageTypes.VERIFY_MESSAGE
        }
      });
      await this.transporter.sendMail({
        from: "ten.djenia@mail.ru",
        to: email,
        subject: "ESDP-HELP-DESK",
        text: message
          ? message.message
          : "Пожалуйста кликните на кнопку и потвердите ваш email!",
        html: `<div style="display: flex; justify-content: center"><a href="${link}" target="_blank" style="background: #40a9ff; border: 1px solid #ccc; color:#fff; text-decoration: none; font-size: 20px; border-radius: 6px; padding: 10px;">Потвердить email!</a></div>`
      });
    } catch (error) {
      await LogCreator.createSystemCrashLog(
        "when sending mail message for verify user",
        error
      );
    }
  },
  async sendMailClientRequest(email, id) {
    if (!this.transporter) return;
    try {
      const message = await MailMessage.findOne({
        where: {
          type: messageTypes.CLIENT_REQUEST_CREATE
        }
      });
      await this.transporter.sendMail({
        from: "ten.djenia@mail.ru",
        to: email,
        subject: message ? message.message : "Ваша заявка принята!",
        // text: ,
        html: `<div>
                            <p>Ваша заявка с id ${id} принята. Мы рассмотрим вашу заявку в ближайщее время. Спасибо за обращение!</p>
                       </div>`
      });
    } catch (error) {
      await LogCreator.createSystemCrashLog(
        "when sending mail message to create request",
        error
      );
    }
  },
  async sendMailEmployeeRequest(email, id) {
    if (!this.transporter) return;
    try {
      const message = await MailMessage.findOne({
        where: {
          type: messageTypes.EMPLOYEE_REQUEST_CREATE
        }
      });
      await this.transporter.sendMail({
        from: "ten.djenia@mail.ru",
        to: email,
        subject: message ? message.message : "На ваше имя пришла новая заявка!",
        // text: "Пожалуйста кликните на кнопку и потвердите ваш email!",
        html: `<div>
                            <p>Заявка с id ${id} назначена на Вас. Проверьте, пожалуйста, в системе!</p>
                       </div>`,
      });
    } catch (error) {
      await LogCreator.createSystemCrashLog(
        "when send message to employee",
        error
      );
    }
  },
};

module.exports = MessageSender;