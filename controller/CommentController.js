const  CommentService  = require('../service/CommentService')



class CommentController {

    async create(req, res) {
        console.log(req.body)
        try {

            const { text_content, news_id } = req.body;
            const user = req.user;  
            console.log('yes')

            const comment = await CommentService.create(news_id, text_content, null, user);
            res.send(comment);
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    }
}

module.exports = new CommentController();

