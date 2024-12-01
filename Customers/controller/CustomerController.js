// customerController.js
const Customer = require('../model/Customer');

class CustomerController {
      //tambah informasi user
      static async createCustomer(req, res) {
        try {
            const { full_name, phone } = req.body;
            const user_id = req.user?.user_id;  // Mengambil user_id dari token yang sudah diverifikasi
        
            if (!user_id) {
                return res.status(400).json({ message: 'User not authenticated' });
            }
          
            // Membuat customer baru
            const newCustomer = await Customer.create({ user_id, full_name, phone });
            res.status(201).json({ message: 'Customer created successfully', data: newCustomer });
        } catch (error) {
            res.status(500).json({ message: 'Error creating customer', error });
        }
    }

    static async updateCustomer(req, res) {
        try {
            const { full_name, phone } = req.body;
            const user_id = req.user?.user_id;  // Mengambil user_id dari token yang sudah diverifikasi
        
            if (!user_id) {
                return res.status(400).json({ message: 'User not authenticated' });
            }
          
            const updated = await Customer.update(
                { full_name, phone },
                { where: { user_id, customer_id: req.params.id } }
            );
          
            if (updated[0] === 0) {
                return res.status(404).json({ message: 'Customer not found or not authorized' });
            }
          
            res.status(200).json({ message: 'Customer updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating customer', error });
        }
    }

    // Get all customers
    static async getAllCustomers(req, res) {
        try {
            const customers = await Customer.findAll();
            res.status(200).json({ data: customers });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching customers', error });
        }
    }

    // Get customer by ID
    static async getCustomerById(req, res) {
        try {
            const { id } = req.params;
            const customer = await Customer.findByPk(id);

            if (customer) {
                res.status(200).json({ data: customer });
            } else {
                res.status(404).json({ message: 'Customer not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching customer', error });
        }
    }
}

module.exports = CustomerController;
