const {Content} = require('../db')

class ContentService{

    async create(path, name, type_id = 1){
        const content = await Content.create({path: path, name : name, type_id: type_id})
        return content;
    }
}

module.exports = new ContentService();
