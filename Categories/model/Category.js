const { DataTypes } = require('sequelize');
const db = require('../../_Config/db'); // Assume database configuration is in this file

const Category = db.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'categories',
    timestamps: false,
});

module.exports = Category;
