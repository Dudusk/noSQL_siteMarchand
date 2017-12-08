const express = require ('express');
const db = require ('../mongodb/db.js');
const path = express.Router();
const productModel = db.modelProduct();


/**
 * Methode GET
 * Lister tous les produits
    * @callback product
 */
path.route('/product').get((req, res) => {
    productModel.find((err, product) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Liste de tous les produits :', product });
    })
});



/**
 * Methode POST
 * Ajouter un produit
    * @param {string} name - Nom du produit
    * @param {number} price - Prix du produit
 */
path.route('/product').post((req, res) => {
    const newProduct = new productModel({});
     newProduct.name = req.headers.name;
     newProduct.price = req.headers.price;
     newProduct.save((err) => {
         if (err) {
             throw err;
         }
         res.json({message: 'Ajout du produit :', newProduct});
     });
});



/**
 * Methode GET
 * Afficher un produit en fonction de son ID
    * @param {number} id - Id du produit a recuperer
    * @callback product
 */
path.route('/product/:id').get((req, res) => {
    productModel.find({_id: req.params.id}, (err, product) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Produit n°' + req.params.id + product});
    });
});



/**
 * Methode DELETE
 * Supprimer un produit
    * @param {number} id - Id du produit a supprimer
    * @callback product
 */
path.route('/product/:id').delete((req, res) => {
    productModel.deleteOne({ _id: req.params.id }, (err, product) =>{
        if (err) {
            throw err;
        }
        console.log('Produit supprimé : ' + req.params.id);
        res.json({ message: 'Suppression du produit n°' + req.params.id , product: product });
    });
});



/**
 * Methode PUT
 * Modifier un produit
    * @param {number} id - Id du produit a modifier
    * @param {string} name - Nom du produit
    * @param {number} price - Prix du produit
 */
path.route('/product/:id').put((req, res) => {
    productModel.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.headers.name,
            price: req.headers.price
        },
    },
    {
        sort: {id: -1 },
        upsert: true,
    }, (err, res) => {
        res.json({ message: 'Modification de la produit n°' + req.params.id + product });
    });
});


module.exports = path;
