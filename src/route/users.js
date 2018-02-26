const express = require ('express');
const db = require ('../mongodb/db.js');

const path = express.Router();
const usersModel = db.modelUsers();


// Page d'accueil
path.route('/').all((req, res) => {
    res.json({ message: 'Page d\'accueil. v1.0'});
});


/**
 * Methode GET
 * Lister tous les produits
    * @callback product
 */
path.route('/users').get((req, res) => {
    usersModel.find((err, users) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Liste de tous les users :', users });
    })
});



/**
 * Methode POST
 * Ajouter un produit
    * @param {string} name - Nom du produit
    * @param {number} price - Prix du produit
 */
path.route('/user').post((req, res) => {
    const newUser = new usersModel({});
     newUser.name = req.headers.name;
     newUser.price = req.headers.price;
     newUser.save((err) => {
         if (err) {
             throw err;
         }
         res.json({message: 'Ajout du user :', newUser});
     });
});


/**
 * Methode GET
 * Afficher un produit en fonction de son ID
    * @param {number} id - Id du produit a recuperer
    * @callback product
 */
path.route('/user/:id').get((req, res) => {
    usersModel.find({_id: req.params.id}, (err, user) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'User n°' + req.params.id, user});
    });
});



/**
 * Methode DELETE
 * Supprimer un produit
    * @param {number} id - Id du produit a supprimer
    * @callback product
 */
path.route('/user/:id').delete((req, res) => {
    usersModel.deleteOne({ _id: req.params.id }, (err, user) =>{
        if (err) {
            throw err;
        }
        console.log('User supprimé : ' + req.params.id);
        res.json({ message: 'Suppression de l\'utilisateur n°' + req.params.id, user });
    });
});



/**
 * Methode PUT
 * Modifier un produit
    * @param {number} id - Id du produit a modifier
    * @param {string} name - Nom du produit
    * @param {number} price - Prix du produit
 */
path.route('/user/:id').put((req, res) => {
    usersModel.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.headers.name,
            price: req.headers.price
        },
    },
    {
        sort: {id: -1 },
        upsert: true,
    }, (err, res) => {
        res.json({ message: 'Modification du user n°' + req.params.id + user });
    });
});



module.exports = path;