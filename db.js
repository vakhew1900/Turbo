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
const Content = require('./model/Content')(sequelize);
const User = require('./model/User')(sequelize);
const Status = require('./model/Status')(sequelize);
const Page = require('./model/Page')(sequelize);
const Draft = require('./model/Draft')(sequelize);
const News = require('./model/News')(sequelize);
const Comment = require('./model/Comment')(sequelize);

// Type-MultiContent

Type.hasMany(Content,
    {
        foreignKey: 'type_id'
    }
);

Content.belongsTo(Type,
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
Content.hasOne(User,
    {
        foreignKey: "avatar_id"
    }
);

User.belongsTo(Content,
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


News.hasOne(Content,
    {
        foreignKey: "content_id"
    })

Content.belongsTo(News,
    {
        foreignKey: "content_id"
    })

// Comment-MultiContent
Content.hasOne(Comment,
    {
        foreignKey: "content_id"
    }
);

Comment.belongsTo(Content,
    {
        foreignKey: "content_id"
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

const ContentPage = sequelize.define('content_page',
    {

        content_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Content,
                key: 'content_id'
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
        tableName: 'content_page'
    },
);

Content.belongsToMany(Page, { through: ContentPage, foreignKey: 'content_id' });
Page.belongsToMany(Content, { through: ContentPage, foreignKey: 'page_id' });


const db = {
    Type: Type,
    Content: Content,
    User: User,
    Status: Status,
    Page: Page,
    Draft: Draft,
    News: News,
    Comment: Comment,
    NewsComments: new NewsComments(),
    ContentPage: new ContentPage(),
    sequelize: sequelize
}

module.exports = db;



// const type = Type.create({name: "active"});
// const content = Content.create({path: "./images", name: "image", type_id : 1 })
// const status = Status.create({name : "active"});
// // const user = User.create({nickname: "user", password: "password", email: "bhfjxtymrhfcbdfz@gmail.com", avatar_id : 1, status_id : 1})
// const page = Page.create({ author_id : 1});
// const draft = Draft.create({draft_id: 2});
// const news = News.create({news_id: 2, title :"title", subtitle : "subtitle", main_image_id : 1 });
// const comment = Comment.create({text_content: "2222", content_id : 1});

// Content.findAll(
//     {
//         include : Type
//     }
// ).then(res => console.log(JSON.stringify(res, null, 2)));

// User.findAll(
//     {
//         include: [Status, Content]
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
//         include: Content
//     }
// ).then(res => console.log(JSON.stringify(res, null, 2)));

// News.findAll(
//     {
//         include: Comment
//     }
// ).then(res => console.log(JSON.stringify(res, null, 2)));


// Page.findAll(
//     {
//         include: Content
//     }
// ).then(res => console.log(JSON.stringify(res, null, 2)));