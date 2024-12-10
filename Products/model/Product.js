const { DataTypes } = require('sequelize');
const db = require('../../_Config/db');

const Product = db.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    colour: {
        type: DataTypes.STRING(50),
        allowNull: true // Optional field
    },
    variant: {
        type: DataTypes.STRING(50),
        allowNull: true // Optional field
    },
    specs: {
        type: DataTypes.TEXT,
        allowNull: true // Optional field
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(255)
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'products',
    timestamps: false
});

module.exports = Product;
