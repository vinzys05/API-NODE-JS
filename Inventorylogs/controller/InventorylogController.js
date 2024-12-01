// InventoryLogController.js
const Product = require('../../Products/model/Product');
const InventoryLog = require('../model/Inventorylog');

class InventoryLogController {
    // Fungsi untuk mencatat perubahan stok
    static async logStockChange(product_id, stock_change, reason) {
        try {
            // Perbarui stok produk
            const product = await Product.findByPk(product_id);
            if (!product) {
                throw new Error('Product not found');
            }

            const newStock = product.stock + stock_change;
            if (newStock < 0) {
                throw new Error('Insufficient stock');
            }

            await product.update({ stock: newStock });

            // Catat log perubahan stok
            await InventoryLog.create({
                product_id,
                stock_change,
                reason,
            });
        } catch (error) {
            throw new Error(`Stock change failed: ${error.message}`);
        }
    }

    // Fungsi untuk mendapatkan semua log stok
    static async getAllLogs(req, res) {
        try {
            const logs = await InventoryLog.findAll();
            res.status(200).json(logs);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching logs', error });
        }
    }

    // Fungsi untuk mendapatkan log stok berdasarkan product_id
    static async getLogsByProduct(req, res) {
        try {
            const { product_id } = req.params;
            const logs = await InventoryLog.findAll({ where: { product_id } });

            if (logs.length === 0) {
                return res.status(404).json({ message: 'No logs found for this product' });
            }

            res.status(200).json(logs);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching logs', error });
        }
    }
}

module.exports = InventoryLogController;
