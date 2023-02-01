const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define(
        'news',
        {
            news_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'news_id',
                autoIncrement: true,
                primaryKey: true
            },

            title: {
                type : DataTypes.STRING(200),
                allowNull: false  
            },

            main_image_id: {
                type : DataTypes.INTEGER
            },

            subtitle : {
                type : DataTypes.STRING(300)
            }

        },

        {
            timestamps: false
        }
    );
}