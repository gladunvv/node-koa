const Koa = require('koa');
const path = require('path');
const session = require('koa-session');
const serve = require('koa-static');
const Pug = require('koa-pug');
const config = require('config');
const router = require('./routes');

const PORT = config.get('port') || 3000;

const app = new Koa();
const pug = new Pug({
    viewPath: path.resolve(__dirname, '../source/template/pages'),
    basedir: path.resolve(__dirname, '../source/template'),
    app: app
  })

app.use(serve(path.join(__dirname, '../public')));
app.use(
  session(
    {
      key: 'key',
      maxAge: 'session',
      overwrite: true,
      httpOnly: true,
      signed: false,
      rolling: false,
      renew: false,
    },
    app,
  ),
);
app.use(router.routes());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
