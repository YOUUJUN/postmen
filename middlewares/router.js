const router = require('koa-router')();
const homeController = require('../controler/home');

module.exports = (app) => {

    router.get('/',homeController.index);

    router.post('/actPost',homeController.actPost);

    router.post('/stopPost',homeController.stopPost);

    router.post('/sendMail',homeController.sendMail);

    app.use(router.routes())
        .use(router.allowedMethods());
};
