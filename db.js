const { DataTypes, Sequelize } = require('sequelize');
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
const Draft = require('./model/Draft')(sequelize);
const News = require('./model/News')(sequelize);
const Comment = require('./model/Comment')(sequelize);

// Type-MultiContent

Type.hasMany(MultiContent,
    {
        foreignKey: 'type_id'
    }
);

MultiContent.belongsTo(Type,
    {
        foreignKey: 'type_id'
    }
);


// Status - User

Status.hasMany(User,
    {
        foreignKey: "status_id"
    }
)

User.belongsTo(Status,
    {
        foreignKey: "status_id"
    }
)

// Page-User
User.hasMany(Page,
    {
        foreignKey: "author_id"
    }
)

Page.belongsTo(User,
    {
        foreignKey: "author_id"
    }
)


// MultiContent User
MultiContent.hasOne(User,
    {
        foreignKey: "avatar_id"
    }
);

User.belongsTo(MultiContent,
    {
        foreignKey: "avatar_id"
    }
);

// Draft- Page
Page.hasOne(Draft,
    {
        foreignKey: "draft_id"
    }
);

Draft.belongsTo(Page,
    {
        foreignKey: "draft_id"
    }
);

// News - Page

Page.hasOne(News,
    {
        foreignKey: "news_id"
    }
);

News.belongsTo(Page,
    {
        foreignKey: "news_id"
    }
);

// Comment-MultiContent
MultiContent.hasOne(Comment,
    {
        foreignKey: "multi_content_id"
    }
);

Comment.belongsTo(MultiContent,
    {
        foreignKey: "multi_content_id"
    }
);

// Comments-News
const NewsComments = sequelize.define('comments_news',
    {
        comment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Comment,
                key: 'comment_id'
            }

        },

        news_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: News,
                key: 'news_id'
            }
        },
    },

    {
        timestamps: false
    },

    {
        tableName: 'comments_news'
    }
);


Comment.belongsToMany(News, { through: NewsComments, foreignKey: 'comment_id' });
News.belongsToMany(Comment, { through: NewsComments, foreignKey: 'news_id' });


//MultiContent-Page

const MultiContentPage = sequelize.define('multi_content_page',
    {
        multi_content_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: MultiContent,
                key: 'multi_content_id'
            }

        },

        page_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Page,
                key: 'page_id'
            }
        },

        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },

    {
        timestamps: false
    },

    {
        freezeTableName: true,
    },

    {
        tableName: 'multi_content_page'
    },
);

MultiContent.belongsToMany(Page, { through: MultiContentPage, foreignKey: 'multi_content_id' });
Page.belongsToMany(MultiContent, { through: MultiContentPage, foreignKey: 'page_id' });

Page.findAll(
    {
        include: MultiContent
    }
).then(res => console.log(JSON.stringify(res, null, 2)));

// const type = Type.create({name: "active"});
// const multi_content = MultiContent.create({path: "./images", name: "image", type_id : 1 })
// const status = Status.create({name : "active"});
// const user = User.create({nickname: "user", password: "password", email: "bhfjxtymrhfcbdfz@gmail.com", avatar_id : 1, status_id : 1})
// const page = Page.create({html_content: "sdfkjds", author_id : 3});
// const draft = Draft.create({draft_id: 2});
// const news = News.create({news_id: 2, title :"title", subtitle : "subtitle", main_image_id : 1 });
// const comment = Comment.create({text_content: "2222", multi_content_id : 1});

// MultiContent.findAll(
//     {
//         include : Type
//     }
// ).then(res => console.log(JSON.stringify(res, null, 2)));

// User.findAll(
//     {
//         include: [Status, MultiContent]
//     }
// ).then(res => console.log(JSON.stringify(res, null, 2)));

// Page.findAll(
//     {
//         include: User
//     }
// ).then(res => console.log(JSON.stringify(res, null, 2)));

// Draft.findAll(
//     {
//         include: Page
//     }
// ).then(res => console.log(JSON.stringify(res, null, 2)));

// News.findAll(
//     {
//         include: Page
//     }
// ).then(res => console.log(JSON.stringify(res, null, 2)));

// Comment.findAll(
//     {
//         include: MultiContent
//     }
// ).then(res => console.log(JSON.stringify(res, null, 2)));

// News.findAll(
//     {
//         include: Comment
//     }
// ).then(res => console.log(JSON.stringify(res, null, 2)));