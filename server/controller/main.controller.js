const db = require('../models/db');

module.exports.getIndex = async (ctx) => {
  let skills = db.get('skills').value();
  let products = db.get('products').value();
  return await ctx.render('index', { title: 'Главная страница', skills, products });
};


