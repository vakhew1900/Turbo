const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define(
        'types',
        { 
          type_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'type_id',
            autoIncrement: true,
            primaryKey: true
          },
          
          name : {
            type: DataTypes.STRING(255)
          }
        },
        
        {
            timestamps: false
        }
    );
}