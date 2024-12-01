const Order = require('../model/Order');

// Order creation and cancellation logic
class OrderController {
    // Membuat order baru
    static async createOrder(req, res) {
        try {
            const { customer_id, total_price } = req.body;

            if (!customer_id || !total_price) {
                return res.status(400).json({ message: 'Customer ID and total price are required' });
            }

            const order = await Order.create({
                customer_id,
                total_price,
                status: 'pending',  // default status 'pending'
            });

            res.status(201).json({
                message: 'Order created successfully',
                order,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error creating order', error });
        }
    }

    static async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll();
            res.status(200).json({
                orders: orders.map(order => ({
                    ...order.toJSON(),
                    total_price: `RP ${parseInt(order.total_price).toLocaleString('id-ID')}`
                }))
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching orders', error });
        }
    }

    // Mendapatkan order berdasarkan ID
    static async getOrderById(req, res) {
        try {
            const { order_id } = req.params;
            const order = await Order.findByPk(order_id);
    
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
    
            res.status(200).json({
                order: {
                    ...order.toJSON(),
                    total_price: `RP ${parseInt(order.total_price).toLocaleString('id-ID')}`
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching order', error });
        }
    }

    // Mengupdate status order (cancel or complete)
    static async cancelOrder(req, res) {
        try {
            const { order_id } = req.params;
            const order = await Order.findByPk(order_id);

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            if (order.status !== 'pending') {
                return res.status(400).json({ message: 'Order can only be cancelled if status is pending' });
            }

            // Fetch associated order items
            const orderItems = await OrderItem.findAll({ where: { order_id } });

            if (orderItems.length === 0) {
                return res.status(404).json({ message: 'No items found for this order' });
            }

            // Return stock for each item and log the change
            for (const item of orderItems) {
                await InventoryLogController.logStockChange(
                    item.product_id,
                    item.quantity,
                    `Restock due to cancellation of Order #${order_id}`
                );
            }

            // Update order status to 'cancelled'
            order.status = 'cancelled';
            await order.save();

            res.status(200).json({
                message: 'Order cancelled and stock restored',
                order
            });
        } catch (error) {
            res.status(500).json({ message: 'Error cancelling order', error });
        }
    }
}

module.exports = OrderController;
