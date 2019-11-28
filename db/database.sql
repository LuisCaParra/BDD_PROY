create database if not exists bddstore;
use bddstore;
/*
drop table customers_addresses;
drop table ref_address_types;
drop table addresses;
drop table customers_orders_delivery;
drop table products_customer_orders;
drop table customer_orders;
drop table products;
drop table suppliers;
drop table customers;
*/
 
create table suppliers
(
    supplier_id          numeric not null ,
    supplier_name        varchar(60) null ,
    other_supplier_details varchar(60) null 
);
 
alter table suppliers
    add constraint  xpksuppliers primary key (supplier_id);
 
create table products
(
    product_id           numeric not null ,
    product_type_code    varchar(60) null ,
    supplier_id          numeric not null 
);
 
alter table products
    add constraint  xpkproducts primary key (product_id,supplier_id);
 
create table customer_orders
(
    order_id             numeric not null ,
    customer_payment_method_id numeric null ,
    order_status_code    varchar(60) null ,
    date_order_placed    varchar(60) null ,
    date_order_paid      varchar(60) null ,
    der_order_price      varchar(60) null ,
    other_order_details  varchar(60) null ,
    customer_id          numeric not null 
);
 
alter table customer_orders
    add constraint  xpkcustomer_orders primary key (order_id,customer_id);
 
create table products_customer_orders
(
    product_id           numeric not null ,
    supplier_id          numeric not null ,
    order_id             numeric not null ,
    customer_id          numeric not null ,
    quantity             numeric null ,
    comments             varchar(60) null 
);
 
alter table products_customer_orders
    add constraint  xpkproducts_customer_orders primary key (product_id,supplier_id,order_id,customer_id);
 
create table customers_orders_delivery
(
    date_reported        varchar(60) not null ,
    delivery_status_code varchar(60) null ,
    order_id             numeric not null ,
    customer_id          numeric not null 
);
 
alter table customers_orders_delivery
    add constraint  xpkcustomers_orders_delivery primary key (date_reported,order_id,customer_id);
 
create table customers
(
    customer_id          numeric not null ,
    customer_name        varchar(60) null ,
    customer_phone       numeric null ,
    customer_email       varchar(60) null ,
    other_customer_details varchar(60) null 
);
 
alter table customers
    add constraint  xpkcustomers primary key (customer_id);
 
create table addresses
(
    address_id           numeric not null ,
    line_1_numeric_building numeric null ,
    line_2_numeric_street numeric null ,
    line_3_area_locality varchar(60) null ,
    city                 varchar(60) null ,
    zip_postcode         numeric null ,
    state_province_country varchar(60) null ,
    iso_country_code     numeric null ,
    other_address_details varchar(60) null 
);
 
alter table addresses
    add constraint  xpkaddresses primary key (address_id);
 
create table ref_address_types
(
    address_type_code    numeric not null ,
    address_type_description varchar(60) null 
);
 
alter table ref_address_types
    add constraint  xpkref_address_types primary key (address_type_code);
 
create table customers_addresses
(
    customer_id          numeric not null ,
    address_id           numeric not null
);
 
alter table customers_addresses
    add constraint  xpkcustomers_addresses primary key (customer_id,address_id);
 
alter table products
    add (constraint r_1 foreign key (supplier_id) references suppliers (supplier_id));
 
alter table customer_orders
    add (constraint r_5 foreign key (customer_id) references customers (customer_id));
 
alter table products_customer_orders
    add (constraint r_3 foreign key (product_id, supplier_id) references products (product_id, supplier_id));
 
alter table products_customer_orders
    add (constraint r_4 foreign key (order_id, customer_id) references customer_orders (order_id, customer_id));
 
alter table customers_orders_delivery
    add (constraint r_12 foreign key (order_id, customer_id) references customer_orders (order_id, customer_id));
 
alter table customers_addresses
    add (constraint r_10 foreign key (customer_id) references customers (customer_id));
 
alter table customers_addresses
    add (constraint r_11 foreign key (address_id) references addresses (address_id));


