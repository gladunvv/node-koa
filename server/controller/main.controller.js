module.exports.getIndex = async (ctx, next) => {
   return await ctx.render('index', { title: 'Главная страница' });
};
