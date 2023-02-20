const { Draft, sequelize } = require('../db');
const PageService = require('./PageService')

class DraftService {

    async create(user, multiContentArray, textArr) {

        const page = await PageService.create(user, multiContentArray, textArr);
        const draft = await Draft.create({ draft_id: page.page_id });

        return draft;
    }

    // async update(page_id, html_content, user, multi_contentArray){

    // }
}

module.exports = new DraftService();

