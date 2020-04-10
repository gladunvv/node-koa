const db = require('../models/db');
const fs = require('fs');
const util = require('util');
const _path = require('path');
const rename = util.promisify(fs.rename);
const unlink = util.promisify(fs.unlink);

module.exports.getAdmin = async (ctx, next) => {
  if (!ctx.session.isAdmin) {
    ctx.redirect('/login');
    return;
  }
  let skills = db.get('skills').value();
  return await ctx.render('admin', { title: 'Админ панель', skills });
};

module.exports.skillsData = (ctx, next) => {
  let { age, concerts, cities, years } = ctx.request.body;

  db.get('skills')
    .find({ id: 'age' })
    .assign({ number: age || 0 })
    .write();

  db.get('skills')
    .find({ id: 'concerts' })
    .assign({ number: concerts || 0 })
    .write();

  db.get('skills')
    .find({ id: 'cities' })
    .assign({ number: cities || 0 })
    .write();

  db.get('skills')
    .find({ id: 'years' })
    .assign({ number: years || 0 })
    .write();

  ctx.redirect('/admin');
};

module.exports.uploadData = async (ctx, next) => {
  const { title, price } = ctx.request.body;
  const { name, size, path } = ctx.request.files.photo;

  const responseError = validation(title, price, name, size);

  if (responseError) {
    await unlink(path);
    return ctx.body = responseError;
  }

  let fileName = _path.join(process.cwd(), 'public', 'upload', name);
  const src = _path.join('upload', name);

  const errUpload = await rename(path, fileName);

  if (errUpload) {
    return (ctx.body = {
      mes: 'При загрузке картинки произошла ошибка',
      status: 'Error',
    });
  }
  db.get('products')
    .push({
      title,
      price,
      src,
    })
    .write();
  ctx.redirect('/admin');
};

const validation = (title, price, name, size) => {
  let response;

  if (title === '') {
    response = {
      mes: 'Не указано название проекта',
      status: 'Error',
    };
  }

  if (price === '') {
    response = {
      mes: 'Не указана цена проекта',
      status: 'Error',
    };
  }

  if (name === '' || size === 0) {
    response = {
      mes: 'Не загружена картинка',
      status: 'Error',
    };
  }

  return response;
};
