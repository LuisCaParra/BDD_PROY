const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');

/**
 * GET all addresses
 */
router.get('/', (req, res) =>
{
    let getAllQuery = 'select * from addresses';

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
    let getQuery = 'select * from addresses where address_id = ?';
    
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

    let fields =
    [
        addressId,
        line1NumericBuilding,
        line2NumericStreet,
        line3AreaLocality,
        city,
        zipPostcode,
        stateProvinceCountry,
        isoCountryCode,
        otherAddressDetails
    ]

    let insertQuery = `
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
    `;

    mysqlConnection.query(insertQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'address Saved'} ); } else { console.log(err); }
    });
});

/**
 * UPDATE a address
 */

router.post('/update/:id', (req, res) =>
{
    let
    {  
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

    let updateQuery = `
    update addresses
        set line_1_numeric_building = ?,
            line_2_numeric_street = ?,
            line_3_area_locality = ?,
            city = ?,
            zip_postcode = ?,
            state_province_country = ?,
            iso_country_code = ?,
            other_address_details while address_id = ?
    `;

    let fields =
    [
        line1NumericBuilding,
        line2NumericStreet,
        line3AreaLocality,
        city,
        zipPostcode,
        stateProvinceCountry,
        isoCountryCode,
        otherAddressDetails,
        addressId
    ]

    mysqlConnection.query(updateQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'address updated'} ); } else { console.log(err); }
    });
});

/**
 * DELETE a address
 */
router.delete('/:id', (req, res) => {
    
    let {id} = req.params;
    let deleteQuery = 'delete from addresses where address_id = ?';

    mysqlConnection.query(deleteQuery, [id], (err) =>
    {
        if (!err) { res.json( {status: 'address Deleted'} ); } else { console.log(err); }
    });
});

module.exports = router;