const Category  = require('../model/Category');

class CategoryController {
    // Create a new category
    static async createCategory(req, res) {
        try {
            const { category_name } = req.body;
            const category = await Category.create({ category_name });
            res.status(201).json({ message: 'Category created successfully', data: category });
        } catch (error) {
            res.status(500).json({ message: 'Error creating category', error });
        }
    }

    // Get all categories
    static async getAllCategories(req, res) {
        try {
            const categories = await Category.findAll();
            res.status(200).json({ data: categories });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching categories', error });
        }
    }

    // Get a single category by ID
    static async getCategoryById(req, res) {
        try {
            const category = await Category.findByPk(req.params.id);
            if (category) {
                res.status(200).json({ data: category });
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching category', error });
        }
    }

    // Update a category
    static async updateCategory(req, res) {
        try {
            const { category_name } = req.body;
            const updated = await Category.update({ category_name }, { where: { category_id: req.params.id } });

            if (updated[0]) {
                res.status(200).json({ message: 'Category updated successfully' });
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating category', error });
        }
    }

    // Delete a category
    static async deleteCategory(req, res) {
        try {
            const deleted = await Category.destroy({ where: { category_id: req.params.id } });

            if (deleted) {
                res.status(200).json({ message: 'Category deleted successfully' });
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting category', error });
        }
    }
}

module.exports = CategoryController;
