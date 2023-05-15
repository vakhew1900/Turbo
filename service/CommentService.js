const { Comment, Content, User } = require('../db')


class CommentService {

    async create(news_id, text_content, multi_content, user) {

        try {

            let content_id = null;

            if (multi_content != null) {
                const content = await Content.create({ path: multiContent.path, name: multiContent.name, type_id: type.type_id});
                content_id = content.content_id;
            }

            const comment = await Comment.create({ news_id: news_id, text_content: text_content, content_id: content_id, user_id: user.user_id});
            
            const send_comment = await this.getById(comment.comment_id);
            console.log(JSON.stringify(send_comment, null, 2));
            return send_comment;
        }
        catch (e) {
            console.log(e.message);
            throw new Error(e.message)
        }
    }

    async getById(comment_id){

        try{
            const comment = await Comment.findOne(
                {
                    where : {
                        comment_id : comment_id
                    },

                    include : {
                        model : User,
                        attributes: { exclude: ["password", "email"] }
                    }
                }
            )
            return comment;
        }
        catch(e){
            throw new Error(e.message);
        }
    }


    
}

module.exports = new CommentService();