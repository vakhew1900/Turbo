const { where } = require('sequelize');
const { News, sequelize, Content, Type, Page, ContentPage } = require('../db');
const PageService = require('./PageService')
const { Op } = require('sequelize');

class NewsService {

    async create(user, multiContentArray, textArr) {

        const page = await PageService.create(user, multiContentArray, textArr);
        console.log(page)
        const title = await this.findTitle(page);
        const main_image = await this.findMainImage(page);
        const news = await News.create({ news_id: page.page_id, title: title.text, main_image_id: main_image.content_id });

        return news;
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
        console.log(JSON.stringify(page, null,2))
        console.log(JSON.stringify(contents, null, 2));

        return {news, page, contents};
    }
}

const newsService = new NewsService;

newsService.findById(22)

module.exports = new NewsService();

