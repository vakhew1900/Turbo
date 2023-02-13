const newsService = require('../service/NewsService')


class NewsController {

    async create(req, res) {


        const { user, multiContentArray, textArr } = reqToPageContent(req, res);
        const news = await newsService.create(user, multiContentArray, textArr);
        res.send(news);
    }
    catch(e) {
        res.status(400).json(e.message);
    }
}


module.exports = new NewsController();