const {CommentService} = require('../service/CommentService')



class CommentController{

    async create(req, res){
        console.log(req.body)
        try{
            
        //    const {user, multiContentArray, textArr} = reqToPageContent(req, res);
            
        //     console.log(JSON.stringify(multiContentArray))
        //     const draft = await draftService.create(user, multiContentArray, textArr);
        //     res.send(draft);
        }
        catch(e){
            res.status(400).json(e.message);
        }
    }
}

module.exports = new DraftController();