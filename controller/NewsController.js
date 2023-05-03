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
            const { news, page, contents, comments } = await newsService.findById(id);
            console.log(JSON.stringify(news, null, 2));

            console.log('------------------------------');
            contents.sort((prev, next) => {
                if (prev.content_page.number < next.content_page.number) return -1;
            });

            const author = await page.getUser();
            
            //console.log("jKFDHSDFKLSgFDSjldfhsgdfsljhadfsgjldfs");
            //console.log(JSON.stringify(comments, null, 2));
            res.render('news', { author: author, contents: contents, comments : comments});
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    }

    async getNews(req, res) {

        try {
            console.log('tut')
            console.log(req.body);
            const { news_id_array } = req.body;
            console.log(news_id_array);
            const news_array = await newsService.getNews(news_id_array);
            console.log('dhsk')
            //console.log(JSON.stringify(news_array, null, 2));
            res.json(news_array);
        }
        catch (e) {
            console.log(e.message);
            res.status(400).json(e.message);
        }

    }
}


module.exports = new NewsController();