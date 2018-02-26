const express = require ('express');
const db = require ('../mongodb/db.js');

db.start();
const mongoose = db.getMongoose();
const path = express.Router();

/**
 * Models MongoDB
 * Model composants
 */
const composantsModel = db.database.model('composants', composantsSchema);

/**
 * Model MongoDB
 * Model users
 */
const usersModel = db.database.model('users', usersSchema);


module.exports = path;
