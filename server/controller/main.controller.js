const db = require('../models/db');
const config = require('config');
const nodemailer = require('nodemailer');

module.exports.getIndex = async (ctx, next) => {
  let skills = db.get('skills').value();
  let products = db.get('products').value();
  return await ctx.render('index', { title: 'Главная страница', skills, products });
};

module.exports.sendMail = async (ctx, next) => {
  const mailConfig = config.get('mail');
  let { name, email, message } = ctx.request.body;
  if (!name || !email || !message) {
    return (ctx.body = { msg: 'Все поля нужно заполнить!', status: 'Error' });
  }

  const transporter = nodemailer.createTransport(mailConfig.smtp);
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: mailConfig.smtp.auth.user,
    subject: mailConfig.subject,
    text: message.trim().slice(0, 500) + `\n Отправлено с: <${email}>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return (ctx.body = {
        msg: `При отправке письма произошла ошибка!: ${error}`,
        status: 'Error',
      });
    }
  });
  ctx.body = { msgemail: 'Письмо успешно отправлено!', status: 'Ok' };
};
