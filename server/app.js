const Koa = require('koa');
const path = require('path');
const session = require('koa-session');
const fs = require('fs');
const serve = require('koa-static');
const Pug = require('koa-pug');
const config = require('config');
const router = require('./routes');
const bodyParser = require('koa-bodyparser');

const PORT = config.get('port') || 3000;

const app = new Koa();
const pug = new Pug({
  viewPath: path.resolve(__dirname, '../source/template/pages'),
  basedir: path.resolve(__dirname, '../source/template'),
  app: app,
});

const CONFIG = {
  key: 'koa:sess',
  maxAge: 50000,
  overwrite: true,
  httpOnly: true,
  signed: false,
  rolling: false,
  renew: false,
};

app.use(serve(path.join(__dirname, '../public')));
app.use(session(CONFIG, app));

app.use(bodyParser());


app.use(router.routes());

app.listen(PORT, () => {
  if (!fs.existsSync(config.upload)) {
    fs.mkdirSync(config.upload);
  }
  console.log(`listening on port ${PORT}`);
});

module.exports = app;