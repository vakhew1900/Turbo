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

          multi_content_id : {
            type: DataTypes.INTEGER,
          }

          
        },
        
        {
            timestamps: false
        }
    );
}