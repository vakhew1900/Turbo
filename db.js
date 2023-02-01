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


// const type = Type.create({name: "active"});