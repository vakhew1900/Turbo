const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define(
        'drafts',
        { 
          draft_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'draft_id',
            autoIncrement: true,
            primaryKey: true
          }

        },
        
        {
            timestamps: false
        }
    );
}