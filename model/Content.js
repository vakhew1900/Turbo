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
            allowNull: false
        },

        name: {
            type: DataTypes.STRING(255),
            allowNull: false   
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