const { Page, sequelize} = require('../db');

class PageService {

    async create(user, multiContentArray) {
        console.log(user);
        const page = await Page.create({author_id: user.user_id });
        this.createPageMultiContentConnection(page, multiContentArray);
        return page;
    }

    
    async createPageMultiContentConnection(page, multiContentArray){

        for (let i = 0; i < multiContentArray.length; i++) {
            const queryString = `insert into content_pages(\`number\`, content_id, page_id) 
            values(${i}, ${multiContentArray[i].content_id}, ${page.page_id});`
            sequelize.query(queryString);
        }
    }
}

module.exports = new PageService();