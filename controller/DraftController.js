const draftService = require('../service/DraftService')


class DraftController{

    async create(res, req){

        try{
            const {multiContentArray, html_content} = req.body;
            const user = req.user;
            await draftService.create(html_content, user, multiContentArray);
        }
        catch{
            res.status(400).json(e.message);
        }
    }
}

module.exports = new DraftController();