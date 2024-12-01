const { DataTypes } = require('sequelize');
const db = require('../../_Config/db');
const Order = require('../../Orders/model/Order');  // Order model import

const Payment = db.define('Payment', {
    payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    method: {
        type: DataTypes.ENUM('transfer', 'credit_card', 'cash'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
    },
    payment_date: {
        type: DataTypes.DATE, // Perbaikan tipe data
        defaultValue: DataTypes.NOW
    },
}, { 
    tableName: 'payments',
    timestamps: false 
});

// Hook untuk mengubah status order ketika pembayaran berhasil
Payment.addHook('afterUpdate', async (payment, options) => {
    if (payment.status === 'completed') {
        const order = await Order.findByPk(payment.order_id);
        if (order && order.status === 'pending') {
            order.status = 'completed';
            await order.save();
        }
    }
});

module.exports = Payment;
