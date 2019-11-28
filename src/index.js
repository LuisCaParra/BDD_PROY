const express = require('express');
const app = express();

/**
 * Describe the routes for customers, orders and employees
 */
const customers = require('./routes/customers');
const suppliers = require('./routes/suppliers');
const addresses = require('./routes/addresses');
const products  = require('./routes/products');
const orders    = require('./routes/customerOrders');

/**
 * Settings
 */
app.set('port', process.env.PORT || 3000);

/**
 * Middlewares
 */
app.use(express.json());

/**
 * Routes
 */
app.use('/api/customers', customers);
app.use('/api/suppliers', suppliers);
app.use('/api/customer_orders', orders);
app.use('/api/addresses', addresses);
app.use('/api/products', products);

/**
 * Starting the server
 */
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});