const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');

/**
 * GET all suppliers
 */
router.get('/', (req, res) =>
{
    let getAllQuery = 'select * from suppliers';

    mysqlConnection.query(getAllQuery, (err, rows) =>
    {
        if (!err) { res.json(rows); } else { console.log(err); }
    });
});

/**
 * GET a single supplier
 */
router.get('/:id', (req, res) =>
{    
    let {id} = req.params;
    let getQuery = 'select * from suppliers where supplier_id = ?';
    
    mysqlConnection.query(getQuery, [id], (err, rows) =>
    {
        if (!err) { res.json(rows[0]); } else { console.log(err); }
    });
});

/**
 * INSERT a supplier
 */
router.post('/', (req, res) =>
{
    let { supplierId, supplierName, otherSupplierDetails } = req.body;

    let insertQuery = `insert into suppliers (supplier_id, supplier_name, other_supplier_details)
    values (?, ?, ?);`;

    mysqlConnection.query(insertQuery, [supplierId, supplierName, otherSupplierDetails], (err, rows) =>
    {
        if (!err) { res.json( {status: 'supplier Saved'} ); } else { console.log(err); }
    });
});

/**
 * UPDATE a supplier
 */

router.post('/update/:id', (req, res) =>
{
    let { supplierId, supplierName, otherSupplierDetails } = req.body;
    let updateQuery = `update suppliers set supplier_name = ?, other_supplier_details = ? where supplier_id = ?`;

    mysqlConnection.query(updateQuery, [supplierName, otherSupplierDetails, supplierId], (err, rows) =>
    {
        if (!err) { res.json( {status: 'supplier updated'} ); } else { console.log(err); }
    });
});

/**
 * DELETE a supplier
 */
router.delete('/:id', (req, res) => {
    
    let {id} = req.params;
    let deleteQuery = 'delete from suppliers where supplier_id = ?';

    mysqlConnection.query(deleteQuery, [id], (err) =>
    {
        if (!err) { res.json( {status: 'supplier Deleted'} ); } else { console.log(err); }
    });
});

module.exports = router;
