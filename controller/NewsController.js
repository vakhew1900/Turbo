const newsService = require('../service/NewsService')
const { reqToPageContent } = require('./additional_functions/parseReq')

class NewsController {

    async create(req, res) {

        try {
            console.log('yes');
            const { user, multiContentArray, textArr } = reqToPageContent(req, res);
            const news = await newsService.create(user, multiContentArray, textArr);
            res.send(news);
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    }

    async getNewsById(req, res) {

        try {
            const id = req.params.id;
            const { news, page, contents } = await newsService.findById(id);
            console.log(JSON.stringify(news, null, 2));

            console.log('------------------------------');
            contents.sort((prev, next) => {
                if (prev.content_page.number < next.content_page.number) return -1;
            });

            const author = await page.getUser();
            res.render('news', { author: author, contents: contents });
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    }

    async getNews(req, res) {

        try {
            const { news_id_array } = req.body;
            const news_array = await NewsService.getNews(news_id_array);
            res.send(news_array);
        }
        catch (e) {
            res.status(400).json(e.message);
        }

    }
}


module.exports = new NewsController();