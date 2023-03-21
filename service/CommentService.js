const {Comment, Content} = require('../db')


class CommentService{

    async create(news_id, text_content, multi_content){
        
        if(news_id == null || typeof news_id != 'number'){
            throw new Error('it`s not a comment for news');
        }

        
        let content_id = null;

        if (multi_content != null){
            const content = await Content.create({path : multiContent.path, name: multiContent.name, type_id: type.type_id});
            content_id = content.content_id;
        }
        
        const comment = await Comment.create({news_id : news_id, text_content: text_content, content_id : content_id});

        return comment;
    }
}

module.exports = CommentService;