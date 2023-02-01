const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define(
        'users',
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'user_id',
                autoIncrement: true,
                primaryKey: true
            },

            nickname: {
                type: DataTypes.STRING(25),
                allowNull: false,
                unique: true
            },

            password: {
                type: DataTypes.STRING(25),
                allowNull: false
            },

            email: {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },

            status_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            avatar_id : {
                type : DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            timestamps: false
        }
    );
};