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


    async getNewsById(req, res){
        const id = req.params.id;
        const {news, page, contents} = await newsService.findById(id);
        console.log(JSON.stringify(news, null, 2));
        res.render('news');
    }
}


module.exports = new NewsController();