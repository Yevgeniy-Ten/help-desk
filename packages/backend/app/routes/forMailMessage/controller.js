const { MailMessage } = require("../../../models");

module.exports = {
  async getAll(req, res) {
    try {
      const allTemplateMessages = await MailMessage.findAll();
      if (!allTemplateMessages.length) res.sendStatus(404);
      return res.send(allTemplateMessages);
    } catch {
      return res.sendStatus(502);
    }
  },
  async editTemplateMessage(req, res) {
    try {
      const { id } = req.params;
      const mailMessage = await MailMessage.findOne({
        where: {
          id,
        },
      });
      if (!mailMessage) return res.sendStatus(404);
      await mailMessage.update(req.body);
      return res.send(mailMessage);
    } catch {
      return res.sendStatus(502);
    }
  },
}