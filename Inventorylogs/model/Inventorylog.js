// InventoryLog.js
const { DataTypes } = require('sequelize');
const db = require('../../_config/db');

const InventoryLog = db.define('InventoryLog', {
    log_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'product_id',
        },
    },
    stock_change: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    logged_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'inventory_logs',
    timestamps: false,
});

module.exports = InventoryLog;
