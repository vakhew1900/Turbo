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
const User = require('./model/User')(sequelize);
const Status = require('./model/Status')(sequelize);
const Page = require('./model/Page')(sequelize);
// const type = Type.create({name: "active"});
// const multi_content = MultiContent.create({path: "./images", name: "image", type_id : 1 })
// const status = Status.create({name : "active"});
// const user = User.create({nickname: "user", password: "password", email: "bhfjxtymrhfcbdfz@gmail.com", avatar_id : 1, status_id : 1})
// const page = Page.create({html_content: "sdfkjds", author_id : 3});