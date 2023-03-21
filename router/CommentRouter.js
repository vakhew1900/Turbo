const {Router} = require('express');
const CommentController = require('../controller/CommentController')
const authMiddlewaree = require('../middleware/authMiddlewaree')
const onload = require('../file_onloader');

const commentRouter = new Router();


commentRouter.post('/comment',authMiddlewaree, CommentController.create);


module.exports = commentRouter;