const nodemailer = require("nodemailer")
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
                    pass: "ouhoXO21vWdWDYOG0Fhg",
                },
            });
        } catch (e) {
            console.error(e)
        }
    },
    async sendVerifyMessage(email, link) {
        if (!this.transporter) return;
        try {
            await this.transporter.sendMail({
                from: "ten.djenia@mail.ru",
                to: email,
                subject: "ESDP-HELP-DESK",
                // text: "Пожалуйста кликните на кнопку и потвердите ваш email!",
                html: `<div style=\"display: flex; justify-content: center\"><a href=\"${link}\" target=\"_blank\" style=\"background: #40a9ff; border: 1px solid #ccc; color:#fff; text-decoration: none; font-size: 20px; border-radius: 6px; padding: 10px;\">Потвердить email!</a></div>`,
            });
        } catch (e) {
            console.error(e)
        }
    },
    async sendMailClientRequest(email, id) {
        if (!this.transporter) return;
        try {
            await this.transporter.sendMail({
                from: "ten.djenia@mail.ru",
                to: email,
                subject: "Ваша заявка принята!",
                // text: "Пожалуйста кликните на кнопку и потвердите ваш email!",
                html: `<div>
                            <p>Ваша заявка с id ${id} принята. Мы рассмотрим вашу заявку в ближайщее время. Спасибо за обращение!</p>
                       </div>`,
            });
        } catch (e) {
            console.error(e)
        }
    },
    async sendMailEmployeeRequest(email, id) {
        if (!this.transporter) return;
        try {
            await this.transporter.sendMail({
                from: "ten.djenia@mail.ru",
                to: email,
                subject: "На ваше имя пришла новая заявка!",
                // text: "Пожалуйста кликните на кнопку и потвердите ваш email!",
                html: `<div>
                            <p>Заявка с id ${id} назначена на Вас. Проверьте, пожалуйста, в системе!</p>
                       </div>`,
            });
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = MessageSender