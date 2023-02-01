const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define(
        'statuses',
        { 
          status_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'status_id',
            autoIncrement: true,
            primaryKey: true
          },
          
          name : {
            type: DataTypes.STRING(300),
            allowNull: false
          }
        },
        
        {
            timestamps: false
        }
    );
}