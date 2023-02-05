const { Draft, Page,  MultiContentPage, sequelize} = require('../db');


class DraftService {

    async create(html_content, user, multiContentArray) {
        const page = await Page.create({ html_content: html_content, author_id: user.user_id });
        const draft = await Draft.create({ draft_id: page.page_id });

        this.createPageMultiContentConnection(page, multiContentArray);
        return draft;
    }

    // async update(page_id, html_content, user, multi_contentArray){

    // }


    async createPageMultiContentConnection(page, multiContentArray){

        for (let i = 0; i < multiContentArray.length; i++) {
            const queryString = `insert into multi_content_pages(\`number\`, multi_content_id, page_id) 
            values(${i}, ${multiContentArray[i].multi_content_id}, ${page.page_id});`
            sequelize.query(queryString);
        }
    }
}

module.exports = new DraftService();

const html_content = "jldfs";
const multi_contentArray = [{multi_content_id: 1}];
const user = {user_id : 3};

const tmp = new DraftService();

 tmp.create(html_content, user, multi_contentArray);
