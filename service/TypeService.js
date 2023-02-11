const {Type} = require('../db')
const { Op } = require('sequelize');

class TypeService{

    async findByName(name){
        const type = await Type.findOne({
            where : {
                name : {
                [Op.eq]: name
                }
            }
           })

        return type;
    }
}

module.exports = new TypeService();