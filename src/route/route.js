const express = require ('express');
const db = require ('../mongodb/db.js');

db.start();
const mongoose = db.getMongoose();
const path = express.Router();

/**
 * Models MongoDB
 */
const productModel = db.database.model('product', productSchema);
const orderModel = db.database.model('order', orderSchema);
const orderLineModel = db.database.model('orderLine', orderLineSchema);


module.exports = path;
