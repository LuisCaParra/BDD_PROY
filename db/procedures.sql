CREATE DEFINER
=`root`@`localhost` PROCEDURE `customerEddit`
(
  IN _customer_id  INT,
  IN _customer_name  VARCHAR
(50),
  IN _customer_phone  NUMERIC,
  IN _customer_email VARCHAR
(50),
  IN _other_customer_details VARCHAR
(20) 
)
BEGIN

  UPDATE Customers
    SET
    customer_id = _customer_id,
    customer_name = _customer_name,
    customer_phone = _customer_phone,
    customer_email = _customer_email,
    other_customer_details =_other_customer_details
    WHERE customer_id  = _customer_id;

  SELECT _customer_id  AS 'customer_id';
END



CREATE DEFINER=`root`@`localhost` PROCEDURE `customerAdd`
(
  IN _customer_id  INT,
  IN _customer_name  VARCHAR
(50),
  IN _customer_phone  NUMERIC,
  IN _customer_email VARCHAR
(50),
  IN _other_customer_details VARCHAR
(20) 
)
BEGIN

  INSERT INTO Customers
    (customer_id , customer_name,customer_phone,customer_email,other_customer_details)
  VALUES
    (_customer_id, _customer_name, _customer_phone, _customer_email, _other_customer_details);
  SET _customer_id
  = LAST_INSERT_ID
  ();

SELECT _customer_id  AS 'customer_id';
END