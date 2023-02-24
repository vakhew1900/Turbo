const NewsService = require("../service/NewsService");


class RenderController{
    
    async renderNewsListPage(req, res){
        const { news_id_array } = req.body;
        const news_array = await NewsService.getNews(news_id_array);
        res.render('news-list', {news_array: news_array})
    }
}