const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define(
        'pages',
        {
            page_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'page_id',
                autoIncrement: true,
                primaryKey: true
            },

        

            author_id : {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },

        {
            timestamps: false
        }
    );
}