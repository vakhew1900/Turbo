const { Page, sequelize, Content} = require('../db');
const ContentService = require('./ContentService');
const TypeService = require('./TypeService');

class PageService {

    async create(user, multiContents, text) {
        console.log(user);
        console.log('------------------')
        console.log(text)
        console.log(multiContents)
        let contentArray = [];

        let type = await TypeService.findByName("text")
        for (let textUnit of text){
            console.log(textUnit)
            const content = await Content.create({text : textUnit.text, type_id : type.type_id});

            const obj = {
                content_id : content.content_id,
                number : textUnit.number
            }

            contentArray.push(obj);
        }


        type = await TypeService.findByName("image")
        for (let multiContent of multiContents){
            console.log(multiContent)
            const content = await Content.create({path : multiContent.path, name: multiContent.name, type_id: type.type_id});

            const obj = {
                content_id : content.content_id,
                number : multiContent.number
            }

            contentArray.push(obj);
        }

        const page = await Page.create({author_id: user.user_id });
        this.createPageMultiContentConnection(page, contentArray);
        return page;
    }

    
    async createPageMultiContentConnection(page, multiContentArray){

        for (let i = 0; i < multiContentArray.length; i++) {
            const queryString = `insert into content_pages(\`number\`, content_id, page_id) 
            values(${multiContentArray[i].number}, ${multiContentArray[i].content_id}, ${page.page_id});`
            sequelize.query(queryString);
        }
    }
}

module.exports = new PageService();