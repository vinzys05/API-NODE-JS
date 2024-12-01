const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const userRoutes = require('./Users/UserRoutes');
const customerRoutes = require('./Customers/CustomerRoutes');
const categoryRoutes = require('./Categories/CategoryRoutes');
const brandRoutes = require('./Brands/BrandRoutes')
const productRoutes = require('./Products/ProductRoutes')
const orderRoutes = require('./Orders/OrderRoutes')
const orderitemRoutes = require('./Orderitems/OrderitemRoutes')
const paymentRoutes = require('./Payments/PaymentRoutes')
const inventorylogRoutes = require('./Inventorylogs/InventorylogRoutes')

//app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// Define routes here
app.use("/user",userRoutes);
app.use("/customer",customerRoutes);
app.use("/category",categoryRoutes);
app.use("/brand",brandRoutes);
app.use("/product",productRoutes);
app.use("/order",orderRoutes);
app.use("/payment",paymentRoutes);
app.use("/orderitem",orderitemRoutes);
app.use("/inventorylog",inventorylogRoutes);

module.exports = app; // Ensure the app instance is exported correctly
