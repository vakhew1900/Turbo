const {Router} = require('express');
const userController = require('../controller/UserController')

const userRouter = new Router();


userRouter.get('/users', userController.login);
userRouter.post('/users', userController.registration);


module.exports = userRouter;