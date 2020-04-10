const { isAuth } = require('../lib/auth');
const db = require('../models/db');

module.exports.getLogin = async (ctx) => {
  return await ctx.render('login', { title: 'Авторизация' });
};

module.exports.loginUser = async (ctx) => {
  const user = db.get('user').value();
  let { password } = ctx.request.body;
  let validate = await isAuth(user, password);
  if (validate) {
    ctx.session.isAdmin = true;
    ctx.redirect('/admin');
  } else {
    await ctx.render('login', {
      msglogin: 'Пользователь не найден',
    });
  }
};
