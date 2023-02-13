const { where } = require('sequelize');
const { News, sequelize, Content, Type, Page, ContentPage } = require('../db');
const PageService = require('./PageService')
const { Op } = require('sequelize');

class NewsService {

    async create(user, multiContentArray, textArr) {

        const page = await PageService.create(user, multiContentArray, textArr);
        const title = await this.findTitle(page);
        const main_image = await this.findMainImage(page);
        const news = await News.create({ news_id: page.page_id, title : title.text, main_image_id: main_image.content_id });

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

    async findMainImage() {


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

}

module.exports = new NewsService();


