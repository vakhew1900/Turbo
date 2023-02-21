const {Router} = require('express');
const NewsController = require('../controller/NewsController');
const renderRouter = new Router();


renderRouter.get('/news/:id', NewsController.getNewsById)

renderRouter.get('/', (req, res) => {
    res.render('index');
})

renderRouter.get('/login', (req, res) => {
    res.render('login');
})

renderRouter.get('/register', (req, res) => {
    res.render('register');
})

renderRouter.get('/redactor', (req, res) => {
    res.render('redactor');
})

renderRouter.get('/news-list', (req, res) => {
    res.render('news-list');
})

renderRouter.get('/news', (req, res) => {
    res.render('news');
})


module.exports = renderRouter;