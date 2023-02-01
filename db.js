const {DataTypes, Sequelize} = require('sequelize');
const configDB = require('./model/configDB')

const sequelize = new Sequelize(
    configDB.name,
    configDB.user,
    configDB.password,
    {
        host: configDB.host,
        dialect: configDB.dialect
    }
);


const Type = require('./model/Type')(sequelize);
const MultiContent = require('./model/MultiContent')(sequelize);

// const type = Type.create({name: "active"});
// const multi_content = MultiContent.create({path: "./images", name: "image", type_id : 1 })