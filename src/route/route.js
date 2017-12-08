const express = require ('express');
const db = require ('../mongodb/db.js');

db.start();
const mongoose = db.getMongoose();
const path = express.Router();

/**
 * Models MongoDB
 * Model product
 */
const productModel = db.database.model('product', productSchema);

/**
 * Model MongoDB
 * Model order
 */
const orderModel = db.database.model('order', orderSchema);

/**
 * Model MongoDB
 * Model orderline
 */
const orderLineModel = db.database.model('orderLine', orderLineSchema);


module.exports = path;
