const {Router} = require('express');
const DraftController = require('../controller/DraftController')

const draftRouter = new Router();

userRouter.post('/drafts/create', DraftController.create);

module.exports = draftRouter;