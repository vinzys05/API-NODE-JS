const Payment = require('../model/Payment');

class PaymentController {
    // Mendapatkan semua pembayaran
    static async getAllPayments(req, res) {
        try {
            const payments = await Payment.findAll();
            if (payments.length === 0) {
                return res.status(404).json({ message: 'No payments found' });
            }

            res.status(200).json({
                payments: payments.map(payment => ({
                    ...payment.toJSON(),
                    amount: `RP ${payment.amount.toLocaleString('id-ID')}`
                }))
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching payments', error });
        }
    }

    // Mendapatkan pembayaran berdasarkan order ID
    static async getPaymentByOrder(req, res) {
        try {
            const { order_id } = req.params;

            const payment = await Payment.findOne({ where: { order_id } });
            if (!payment) {
                return res.status(404).json({ message: 'No payment found for this order' });
            }

            res.status(200).json({
                ...payment.toJSON(),
                amount: `RP ${payment.amount.toLocaleString('id-ID')}`
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching payment', error });
        }
    }

    // Membuat pembayaran baru
    static async createPayment(req, res) {
        try {
            const { order_id, amount, method } = req.body;

            // Cek jika sudah ada pembayaran sukses
            const existingPayment = await Payment.findOne({
                where: { order_id, status: 'completed' }
            });

            if (existingPayment) {
                return res.status(400).json({
                    message: 'Payment for this order is already completed'
                });
            }

            const newPayment = await Payment.create({
                order_id,
                amount,
                method,
                status: 'completed'
            });

            res.status(201).json({ message: 'Payment successful', newPayment });
        } catch (error) {
            res.status(500).json({ message: 'Error creating payment', error });
        }
    }

    // Menghapus pembayaran (jika dibutuhkan)
    //static async deletePayment(req, res) {
    //    try {
    //        const { payment_id } = req.params;
    //        const payment = await Payment.findByPk(payment_id);

    //        if (!payment) {
    //            return res.status(404).json({ message: 'Payment not found' });
    //        }

    //        await payment.destroy();
    //        res.status(200).json({ message: 'Payment deleted successfully' });
    //    } catch (error) {
    //        res.status(500).json({ message: 'Error deleting payment', error });
    //    }
    //}
}

module.exports = PaymentController;
