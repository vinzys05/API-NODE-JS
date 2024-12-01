const { DataTypes } = require('sequelize');
const db = require('../../_Config/db'); // Sesuaikan dengan konfigurasi database Anda

const Order = db.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Bisa dihapus jika customer dihapus
    },
    order_date: {
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        defaultValue: 'pending'
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'orders',
    timestamps: false
});

module.exports = Order;
