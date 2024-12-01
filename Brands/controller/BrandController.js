const Brand = require('../model/Brand');

class BrandController {
    // Create a new brand
    static async createBrand(req, res) {
        try {
            const { brand_name } = req.body;
            const brand = await Brand.create({ brand_name });
            res.status(201).json({ message: 'Brand created successfully', data: brand });
        } catch (error) {
            res.status(500).json({ message: 'Error creating brand', error });
        }
    }

    // Get all brands
    static async getAllBrands(req, res) {
        try {
            const brands = await Brand.findAll();
            res.status(200).json({ data: brands });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching brands', error });
        }
    }

    // Get a single brand by ID
    static async getBrandById(req, res) {
        try {
            const brand = await Brand.findByPk(req.params.id);
            if (brand) {
                res.status(200).json({ data: brand });
            } else {
                res.status(404).json({ message: 'Brand not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching brand', error });
        }
    }

    // Update a brand
    static async updateBrand(req, res) {
        try {
            const { brand_name } = req.body;
            const updated = await Brand.update({ brand_name }, { where: { brand_id: req.params.id } });

            if (updated[0]) {
                res.status(200).json({ message: 'Brand updated successfully' });
            } else {
                res.status(404).json({ message: 'Brand not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating brand', error });
        }
    }

    // Delete a brand
    static async deleteBrand(req, res) {
        try {
            const deleted = await Brand.destroy({ where: { brand_id: req.params.id } });

            if (deleted) {
                res.status(200).json({ message: 'Brand deleted successfully' });
            } else {
                res.status(404).json({ message: 'Brand not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting brand', error });
        }
    }
}

module.exports = BrandController;
