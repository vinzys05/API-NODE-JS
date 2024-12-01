const Order = require('../model/Order');
const Payment = require('../../Payments/model/Payment');

class OrderPay {
    static async completeOrderIfPaid(req, res) {
        try {
            const { order_id } = req.params;

            // Cari order berdasarkan ID
            const order = await Order.findByPk(order_id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Validasi status order
            if (order.status === 'cancelled') {
                return res.status(400).json({ message: 'Cannot complete a cancelled order' });
            }

            if (order.status !== 'pending') {
                return res.status(400).json({ message: 'Order is not in a payable state' });
            }

            // Cek apakah ada payment terkait yang berhasil
            const payment = await Payment.findOne({
                where: { order_id, status: 'completed' }
            });

            if (!payment) {
                return res.status(400).json({ message: 'Payment not completed for this order' });
            }

            // Update status order ke completed
            order.status = 'completed';
            await order.save();

            res.status(200).json({ message: 'Order marked as completed', order });
        } catch (error) {
            res.status(500).json({ message: 'Error updating order status', error });
        }
    }
}

module.exports = OrderPay;
