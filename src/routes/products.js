const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');

/*
create table products
(
    product_id           numeric not null ,
    product_type_code    varchar(60) null ,
    supplier_id          numeric not null 
);

    product_id,
    product_type_code,
    supplier_id

    productId,
    productTypeCode,
    supplierId

*/


/**
 * GET all products
 */
router.get('/', (req, res) =>
{
    let getAllQuery = 'select * from products';

    mysqlConnection.query(getAllQuery, (err, rows) =>
    {
        if (!err) { res.json(rows); } else { console.log(err); }
    });
});

/**
 * GET a single address
 */
router.get('/:id', (req, res) =>
{    
    let {id} = req.params;
    let getQuery = 'select * from products where product_id = ?';
    
    mysqlConnection.query(getQuery, [id], (err, rows) =>
    {
        if (!err) { res.json(rows[0]); } else { console.log(err); }
    });
});

/**
 * INSERT a address
 */
router.post('/', (req, res) =>
{
    let
    {  
        productId,
        productTypeCode,
        supplierId
    } = req.body;

    let fields =
    [
        productId,
        productTypeCode,
        supplierId
    ]

    let insertQuery = `
    insert into products  (product_id,
                           product_type_code,
                           supplier_id)
    values (?, ?, ?);
    `;

    mysqlConnection.query(insertQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'product Saved'} ); } else { console.log(err); }
    });
});

/**
 * UPDATE a product
 */

router.post('/update/:id', (req, res) =>
{
    let
    {  
        productId,
        productTypeCode,
        supplierId
    } = req.body;

    let fields =
    [
        productTypeCode,
        supplierId,
        productId
    ]

    let updateQuery = `
    update products
        set product_type_code,
            supplier_id while product_id = ?
    `;

    mysqlConnection.query(updateQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'product updated'} ); } else { console.log(err); }
    });
});

/**
 * DELETE a product
 */
router.delete('/:id', (req, res) => {
    
    let {id} = req.params;
    let deleteQuery = 'delete from products where product_id = ?';

    mysqlConnection.query(deleteQuery, [id], (err) =>
    {
        if (!err) { res.json( {status: 'product Deleted'} ); } else { console.log(err); }
    });
});

module.exports = router;