const draftService = require('../service/DraftService')


class DraftController{

    async create(req, res){
        console.log(req.body)
        try{
            const {multiContentArray, html_content} = req.body;
            const user = req.user;
            console.log(multiContentArray, html_content, user);
            const draft = await draftService.create(html_content, user, multiContentArray);
            res.send(draft);
        }
        catch(e){
            res.status(400).json(e.message);
        }
    }
}

module.exports = new DraftController();