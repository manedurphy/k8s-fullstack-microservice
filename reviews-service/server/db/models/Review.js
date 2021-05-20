const sequelize = require('../index');
const { Model, DataTypes } = require('sequelize');

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        space: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'review',
        tableName: 'reviews',
    },
);

module.exports = Review;
