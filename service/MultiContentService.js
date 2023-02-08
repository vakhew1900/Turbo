const {MultiContent} = require('../db')

class MultiContentService{

    async create(path, name, type_id = 1){
        const multicontent = await MultiContent.create({path: path, name : name, type_id: type_id})
        return multicontent;
    }
}

module.exports = new MultiContentService();
