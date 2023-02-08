const {Router} = require('express');
const DraftController = require('../controller/DraftController')
const authMiddlewaree = require('../middleware/authMiddlewaree')

const draftRouter = new Router();

draftRouter.post('/drafts',authMiddlewaree, DraftController.create);

module.exports = draftRouter;