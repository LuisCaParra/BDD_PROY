const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');

/**
 * GET all customers
 */
router.get('/', (req, res) =>
{
    let getAllQuery = 'select * from customers';

    mysqlConnection.query(getAllQuery, (err, rows) =>
    {
        if (!err) { res.json(rows); } else { console.log(err); }
    });
});

/**
 * GET a single customers
 */
router.get('/:id', (req, res) =>
{    
    let {id} = req.params;
    let getQuery = 'select * from customers where customer_id = ?';
    
    mysqlConnection.query(getQuery, [id], (err, rows) =>
    {
        if (!err) { res.json(rows[0]); } else { console.log(err); }
    });
});

/**
 * INSERT a customer with address
 */
router.post('/', (req, res) =>
{
    let {
        customerId,
        customerName,
        customerPhone,
        customerEmail,
        otherCustomerDetails,
        addressId,
        line1NumericBuilding,
        line2NumericStreet,
        line3AreaLocality,
        city,
        zipPostcode,
        stateProvinceCountry,
        isoCountryCode,
        otherAddressDetails        
    } = req.body;

    let customer =
    [
        customerId,
        customerName,
        customerPhone,
        customerEmail,
        otherCustomerDetails,
        addressId,
        line1NumericBuilding,
        line2NumericStreet,
        line3AreaLocality,
        city,
        zipPostcode,
        stateProvinceCountry,
        isoCountryCode,
        otherAddressDetails,
        customerId,
        addressId
    ]
      
    let insert = `
    insert into customers (customer_id,
                           customer_name,
                           customer_phone,
                           customer_email,
                           other_customer_details)
    values (?, ?, ?, ?, ?);    

    insert into addresses (address_id,
        line_1_numeric_building,
        line_2_numeric_street,
        line_3_area_locality,
        city,
        zip_postcode,
        state_province_country,
        iso_country_code,
        other_address_details)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?);

    insert into customers_addresses (customer_id, address_id)
    values(?, ?);
    `;

    mysqlConnection.query(insert, customer, (err, rows) =>
    {
        if (!err) {
            res.json( {status: 'both Saved'} );
        } else { console.log(err); }
    });

    
});

/**
 * UPDATE a customer
 */
router.post('/update/:id', (req, res) =>
{
    let {
        customerId,
        customerName,
        customerPhone,
        customerEmail,
        otherCustomerDetails
    } = req.body;

    let fields = 
    [
        String(customerName),
        customerPhone,
        String(customerEmail),
        String(otherCustomerDetails),
        customerId
    ]

    let updateQuery = `
    update customers
        set customer_name = ?,
        customer_phone = ?,
        customer_email = ?,
        other_customer_details = ? where customer_id = ?
    `;

    mysqlConnection.query(updateQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'customer updated'} ); } else { console.log(err); }
    });
});

/**
 * DELETE a customer
 */
router.delete('/:id', (req, res) => {
    
    let {id} = req.params;
    let deleteQuery = 'delete from customers where customer_id = ?';

    mysqlConnection.query(deleteQuery, [id], (err) =>
    {
        if (!err) { res.json( {status: 'customer Deleted'} ); } else { console.log(err); }
    });
});

module.exports = router;