const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define(
     'multi_content',
     {
        multi_content_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'multi_content_id',
            autoIncrement: true,
            primaryKey: true
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