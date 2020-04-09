const Router = require('koa-router');
const router = new Router();

// const login = require('../controllers/login');
// const mainPage = require('../controllers/main');
// const contactMe = require('../controllers/contact');
// const work = require('../controllers/work');
const mainController = require('../controller/main.controller');
// router.post('/login', login.login);
// router.get('/login', login.loginPage);

router.get('/', mainController.getIndex);

// router.get('/contact-me', contactMe.contactPage);
// router.post('/contact-me', contactMe.sendEmail);

// router.get('/my-work',work.workPage);
// router.post('/my-work',work.workSend);

module.exports = router;
