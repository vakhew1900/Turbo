const NewsService = require("../service/NewsService");


class RenderController{
    
    async renderNewsListPage(req, res){
        const { news_id_array } = req.body;
        const news_array = await NewsService.getNews(news_id_array);
        console.log(JSON.stringify(news_array, null, 2))
        res.render('news-list', {news_array: news_array})
    }
}

module.exports = new RenderController()