const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');

/**
 * GET all orders
 */
router.get('/', (req, res) =>
{
    let getAllQuery = 'select * from customer_orders';

    mysqlConnection.query(getAllQuery, (err, rows) =>
    {
        if (!err) { res.json(rows); } else { console.log(err); }
    });
});

/**
 * GET a single order
 */
router.get('/:id', (req, res) =>
{    
    let {id} = req.params;
    let getQuery = 'select * from customer_orders where order_id = ?';
    
    mysqlConnection.query(getQuery, [id], (err, rows) =>
    {
        if (!err) { res.json(rows[0]); } else { console.log(err); }
    });
});

/**
 * INSERT a order
 */
router.post('/', (req, res) =>
{
    let
    {  
        orderId,
        customerPaymentMethodId,
        orderStatusCode,
        dateOrderPlaced,
        dateOrderPaid,
        derOrderPrice,
        otherOrderDetails,
        customerId
    } = req.body;

    let fields =
    [
        orderId,
        customerPaymentMethodId,
        String(orderStatusCode),
        String(dateOrderPlaced),
        String(dateOrderPaid),
        derOrderPrice,
        String(otherOrderDetails),
        customerId
    ];

    let insertQuery = `
    insert into customer_orders (order_id,
                                 customer_payment_method_id,
                                 order_status_code,
                                 date_order_placed,
                                 date_order_paid,
                                 der_order_price,
                                 other_order_details,
                                 customer_id)
    values (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    console.log(fields);

    mysqlConnection.query(insertQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'order Saved'} ); } else { console.log(err); }
    });
});

/**
 * UPDATE a order
 */

router.post('/update/:id', (req, res) =>
{
    let
    {  
        orderId,
        customerPaymentMethodId,
        orderStatusCode,
        dateOrderPlaced,
        dateOrderPaid,
        derOrderPrice,
        otherOrderDetails,
        customerId
    } = req.body;

    let fields = 
    [
        customerPaymentMethodId,
        String(orderStatusCode),
        String(dateOrderPlaced),
        String(dateOrderPaid),
        derOrderPrice,
        String(otherOrderDetails),
        customerId,
        orderId
    ];

    let updateQuery = `
    update customer_orders
        set customer_payment_method_id = ?,
        order_status_code = ?,
        date_order_placed = ?,
        date_order_paid = ?,
        der_order_price = ?,
        other_order_details = ?,
        customer_id = ? where order_id = ?
    `;

    mysqlConnection.query(updateQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'order updated'} ); } else { console.log(err); }
    });
});

/**
 * DELETE a order
 */
router.delete('/:id', (req, res) => {
    
    let {id} = req.params;
    let deleteQuery = 'delete from customer_orders where order_id = ?';

    mysqlConnection.query(deleteQuery, [id], (err) =>
    {
        if (!err) { res.json( {status: 'order Deleted'} ); } else { console.log(err); }
    });
});

module.exports = router;