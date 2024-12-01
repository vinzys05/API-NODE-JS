const { DataTypes } = require('sequelize');
const sequelize = require('../../_Config/db'); // Database configuration

const Brand = sequelize.define('Brand', {
    brand_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    brand_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'brands',
    timestamps: false,
});

module.exports = Brand;
