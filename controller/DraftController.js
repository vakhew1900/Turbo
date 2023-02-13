const draftService = require('../service/DraftService')
const { reqToPageContent } = require('./additional_functions/parseReq')


class DraftController{

    async create(req, res){
        console.log(req.body)
        try{
            
           const {user, multiContentArray, textArr} = reqToPageContent(req, res);
            
            console.log(JSON.stringify(multiContentArray))
            const draft = await draftService.create(user, multiContentArray, textArr);
            res.send(draft);
        }
        catch(e){
            res.status(400).json(e.message);
        }
    }
}

module.exports = new DraftController();