const newsService = require('../service/NewsService')
const { reqToPageContent } = require('./additional_functions/parseReq')

class NewsController {

    async create(req, res) {

        console.log('yes');
        const { user, multiContentArray, textArr } = reqToPageContent(req, res);
        const news = await newsService.create(user, multiContentArray, textArr);
        res.send(news);
    }
    catch(e) {
        res.status(400).json(e.message);
    }
}


module.exports = new NewsController();