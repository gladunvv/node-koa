const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router();

const mainController = require('../controller/main.controller');
const adminController = require('../controller/admin.controller');
const loginController = require('../controller/login.controller');

router.get('/', mainController.getIndex);

router.get('/admin', adminController.getAdmin);
router.post('/admin/skills', adminController.skillsData);
router.post(
  '/admin/upload',
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: process.cwd() + '/public/upload',
    },
  }),
  adminController.uploadData,
);

router.get('/login', loginController.getLogin);
router.post('/login', loginController.loginUser);

module.exports = router;
