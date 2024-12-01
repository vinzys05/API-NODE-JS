// OrderItemController.js
const Order = require('../../Orders/model/Order');
const OrderItem = require('../model/OrderItem');
const Product = require('../../Products/model/Product');

class OrderItemController {
    // Fungsi untuk menambahkan item ke dalam order
    static async addOrderItems(req, res) {
        try {
            const { order_id, items } = req.body;

            let totalPrice = 0;

            // Validasi order_id
            const order = await Order.findByPk(order_id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Tambahkan setiap item dalam order
            for (const item of items) {
                const { product_id, quantity } = item;

                // Ambil harga dari tabel Products
                const product = await Product.findByPk(product_id);
                if (!product) {
                    return res.status(404).json({ message: `Product with ID ${product_id} not found` });
                }

                const price = product.price;
                const subtotal = quantity * price;

                // Tambahkan OrderItem
                await OrderItem.create({
                    order_id,
                    product_id,
                    quantity,
                    price,
                    subtotal,
                });

                // Tambahkan subtotal ke total order
                totalPrice += subtotal;
            }

            // Update total_price di order
            await order.update({ total_price: totalPrice });

            res.status(201).json({ message: 'Order items added successfully', total_price: `RP ${totalPrice.toLocaleString('id-ID')}` });
        } catch (error) {
            console.error('Add OrderItems Error:', error);
            res.status(500).json({ message: 'Error adding order items', error });
        }
    }

    // Fungsi untuk mendapatkan semua order items
    static async getAllOrderItems(req, res) {
        try {
            const orderItems = await OrderItem.findAll();

            if (orderItems.length === 0) {
                return res.status(404).json({ message: 'No order items found' });
            }

            res.status(200).json(orderItems.map(item => ({
                ...item.toJSON(),
                price: `RP ${item.price.toLocaleString('id-ID')}`,
                subtotal: `RP ${item.subtotal.toLocaleString('id-ID')}`
            })));
        } catch (error) {
            console.error('Get All OrderItems Error:', error);
            res.status(500).json({ message: 'Error fetching order items', error });
        }
    }

    // Fungsi untuk mendapatkan semua item berdasarkan order ID
    static async getOrderItemsByOrder(req, res) {
        try {
            const { order_id } = req.params;
            const orderItems = await OrderItem.findAll({ where: { order_id } });

            if (orderItems.length === 0) {
                return res.status(404).json({ message: 'No order items found for this order' });
            }

            // Hitung total subtotal untuk order ini
            const totalSubtotal = orderItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

            res.status(200).json({
                items: orderItems.map(item => ({
                    ...item.toJSON(),
                    price: `RP ${item.price.toLocaleString('id-ID')}`,
                    subtotal: `RP ${item.subtotal.toLocaleString('id-ID')}`
                })),
                totalSubtotal: `RP ${totalSubtotal.toLocaleString('id-ID')}`
            });
        } catch (error) {
            console.error('Get OrderItems Error:', error);
            res.status(500).json({ message: 'Error fetching order items', error });
        }
    }
}

module.exports = OrderItemController;
