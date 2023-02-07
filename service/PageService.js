const { Page, sequelize} = require('../db');

class PageService {

    async create(html_content, user, multiContentArray) {
        const page = await Page.create({ html_content: html_content, author_id: user.user_id });
        this.createPageMultiContentConnection(page, multiContentArray);
        return page;
    }

    
    async createPageMultiContentConnection(page, multiContentArray){

        for (let i = 0; i < multiContentArray.length; i++) {
            const queryString = `insert into multi_content_pages(\`number\`, multi_content_id, page_id) 
            values(${i}, ${multiContentArray[i].multi_content_id}, ${page.page_id});`
            sequelize.query(queryString);
        }
    }
}

module.exports = new PageService();