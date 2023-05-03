const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define(
        'comments',
        { 
          comment_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'comment_id',
            autoIncrement: true,
            primaryKey: true
          },
          
          text_content : {
            type: DataTypes.STRING(600),
            allowNull: false
          },

          content_id : {
            type: DataTypes.INTEGER,
          },

          user_id : {
            type: DataTypes.INTEGER
          },

          news_id : {
            type: DataTypes.INTEGER
          }

        },
        
        {
            timestamps: false
        }
    );
}