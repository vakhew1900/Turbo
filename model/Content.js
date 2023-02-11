const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define(
     'contents',
     {
        content_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'content_id',
            autoIncrement: true,
            primaryKey: true
        },

        text : {
            type : DataTypes.TEXT
        },

        path: {
            type: DataTypes.STRING(300),
        },

        name: {
            type: DataTypes.STRING(255),  
        },

        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
     },
     {
        timestamps: false
     } 
    )
}