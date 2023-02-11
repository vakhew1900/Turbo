const {Router} = require('express');
const DraftController = require('../controller/DraftController')
const authMiddlewaree = require('../middleware/authMiddlewaree')
const onload = require('../file_onloader')

const draftRouter = new Router();

draftRouter.post('/drafts',authMiddlewaree, onload.any(), DraftController.create);

module.exports = draftRouter;