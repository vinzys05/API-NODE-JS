const Product = require('../model/Product');

class ProductController {
    // Mendapatkan semua produk dengan harga terformat
    static async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();

            const formattedProducts = products.map(product => ({
                ...product.dataValues,
                price: new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                }).format(product.price)
            }));

            res.status(200).json({ data: formattedProducts });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }

    // Mendapatkan produk berdasarkan ID
    static async getProductById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const formattedProduct = {
                ...product.dataValues,
                price: new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                }).format(product.price)
            };

            res.status(200).json({ data: formattedProduct });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error });
        }
    }

    // Menambahkan produk baru
    static async createProduct(req, res) {
        try {
            const { product_name, colour, variant, specs, price, stock, category_id, brand_id } = req.body;
            const image = req.file ? `uploads/images/${req.file.filename}` : null;

            const newProduct = await Product.create({
                product_name,
                colour,
                variant,
                specs,
                price,
                stock,
                category_id,
                brand_id,
                image
            });

            res.status(201).json({
                message: 'Product created successfully',
                data: newProduct
            });
        } catch (error) {
            res.status(500).json({ message: 'Error creating product', error });
        }
    }


    // Mengupdate produk berdasarkan ID
    static async updateProduct(req, res) {
        try {
            const { product_name, colour, variant, specs, price, stock, category_id, brand_id } = req.body;
            const image = req.file ? `uploads/images/${req.file.filename}` : null;
        
            const updatedProduct = await Product.update(
                {
                    product_name,
                    colour,
                    variant,
                    specs,
                    price,
                    stock,
                    category_id,
                    brand_id,
                    image
                },
                { where: { product_id: req.params.id } }
            );
        
            if (updatedProduct[0] === 0) {
                return res.status(404).json({ message: 'Product not found or no changes made' });
            }
        
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error });
        }
    }


    // Menghapus produk berdasarkan ID
    static async deleteProduct(req, res) {
        try {
            const deletedProduct = await Product.destroy({
                where: { product_id: req.params.id }
            });

            if (deletedProduct === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    }
}

module.exports = ProductController;
