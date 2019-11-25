const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all Customers
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM Customers', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// GET A customer
router.get('/:id', (req, res) => {
    const {
        id
    } = req.params;
    mysqlConnection.query('SELECT * FROM Customers WHERE customer_id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// DELETE A Customer
router.delete('/:id', (req, res) => {
    const {
        id
    } = req.params;
    mysqlConnection.query('DELETE FROM Customers WHERE customer_id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({
                status: 'Customer Deleted'
            });
        } else {
            console.log(err);
        }
    });
});

// INSERT A Customer
router.post('/', (req, res) => {
    const {
        customerId,
        customerName,
        customerPhone,
        customerEmail,
        otherCustomerDetails
    } = req.body;
    console.log(customerId, customerName, customerPhone, customerEmail, otherCustomerDetails);
    const query = `
    SET @customer_id = ?;
    SET @customer_name = ?;
    SET @customer_phone = ?;
    SET @customer_email = ?;
    SET @other_customer_details = ?;
    CALL customerAddOrEdit(@customer_id, @customer_name, @customer_phone,@customer_email,@other_customer_details);
  `;
    mysqlConnection.query(query, [customerId, customerName, customerPhone, customerEmail, otherCustomerDetails], (err, rows, fields) => {
        if (!err) {
            res.json({
                status: 'Customer Saved'
            });
        } else {
            console.log(err);
        }
    });

});

//update a customer

router.put('/:id', (req, res) => {
    const {
        customerName,
        customerPhone,
        customerEmail,
        otherCustomerDetails
    } = req.body;
    const {
        id
    } = req.params;
    const query = `
     SET @customer_id = ?;
     SET @customer_name = ?;
     SET @customer_phone = ?;
     SET @customer_email = ?;
     SET @other_customer_details = ?;
     CALL customerEddit(@customer_id, @customer_name, @customer_phone,@customer_email,@other_customer_details);
   `;
    mysqlConnection.query(query, [id, customerName, customerPhone, customerEmail, otherCustomerDetails], (err, rows, fields) => {
        if (!err) {
            res.json({
                status: 'Customer Updated'
            });
        } else {
            console.log(err);
        }
    });
});

module.exports = router;