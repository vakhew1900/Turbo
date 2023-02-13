const {Router} = require('express');
const NewsController = require('../controller/NewsController')
const authMiddlewaree = require('../middleware/authMiddlewaree')
const onload = require('../file_onloader')

const newsRouter = new Router();

newsRouter.post('/news',authMiddlewaree, onload.any(), NewsController.create);

module.exports = newsRouter;