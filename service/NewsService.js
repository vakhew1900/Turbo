const { where } = require('sequelize');
const { News, sequelize, Content, Type, Page, ContentPage, User } = require('../db');
const PageService = require('./PageService')
const { Op } = require('sequelize');

class NewsService {

    async create(user, multiContentArray, textArr) {

        const page = await PageService.create(user, multiContentArray, textArr);
        console.log(page)
        const title = await this.findTitle(page);
        const main_image = await this.findMainImage(page);
        
        
        const main_image_id = main_image != null ? main_image.content_id : null;
        const news = await News.create({ news_id: page.page_id, title: title.text, main_image_id: main_image_id});

        return news;
    }

    async getNews(used_news_id = []) {

        console.log('adskladhsdfsahfadk');
        const limit = 20;

        console.log('adskladhsdfsahfadk')

        if (Array.isArray(used_news_id) == false) {
            throw new Error("incorrect params");
        }

        let used_news_id_number = used_news_id.map(Number);


        const news_array = await News.findAll(
            {
                limit: limit,

                where: {
                    news_id: {
                        [Op.notIn]: used_news_id_number
                    }
                },

                order : [
                    ['news_id', 'DESC']
                ],

                include: [{
                    model: Page,
                    include: {
                        model: User,
                        attributes: { exclude: ["password", "email"] }
                    }
                },

                {
                    model : Content
                }
            ]
            }

        )


        return news_array;
        // console.log(JSON.stringify(news_array[0].page.user, null, 2))
    }

    async findTitle(page) {

        const title = await Content.findOne(
            {
                include: [{
                    model: Page,

                    where: {
                        page_id: {
                            [Op.eq]: page.page_id
                        },

                    }



                },

                {
                    model: Type,

                    where: {
                        name: "text"
                    }
                }

                ]

            }
        )

        return title;
    }

    async findMainImage(page) {


        const main_image = await Content.findOne(
            {
                include: [{
                    model: Page,

                    where: {
                        page_id: {
                            [Op.eq]: page.page_id
                        },

                    }



                },

                {
                    model: Type,

                    where: {
                        name: "image"
                    }
                }

                ]

            }
        )



        return main_image;

    }


    async findById(id) {

        const news = await News.findOne({

            where: {
                news_id: {
                    [Op.eq]: id
                }
            }

        }
        )

        console.log('adasdsa')
        console.log(JSON.stringify(news, null, 2));

        const page = await news.getPage();
        const contents = await page.getContents();
        console.log(JSON.stringify(page, null, 2))
        console.log(JSON.stringify(contents, null, 2));

        for (let content of contents) {
            const type = await content.getType();
            console.log(type.name);
            content.type = type.name;
        }

        // console.log(JSON.stringify(contents[0].type, null, 2));
        return { news: news, page: page, contents: contents };
    }
}

const newsService = new NewsService;

newsService.getNews();

module.exports = new NewsService();

