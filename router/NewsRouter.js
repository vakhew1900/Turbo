const {Router} = require('express');
const NewsController = require('../controller/NewsController')
const authMiddlewaree = require('../middleware/authMiddlewaree')
const onload = require('../file_onloader');

const newsRouter = new Router();


newsRouter.post('/news',authMiddlewaree, onload.any(), NewsController.create);
newsRouter.get('/news/:id', (req, res) => {
    
    const news = 

    console.log('22222');
    console.log(req.params.id);
})


module.exports = newsRouter;