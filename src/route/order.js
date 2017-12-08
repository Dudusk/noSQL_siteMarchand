const express = require ('express');
const db = require ('../mongodb/db.js');
const path = express.Router();
const orderModel = db.modelOrder();


/**
 * Methode GET
 * Lister toutes les commandes
    * @callback order
 */
path.route('/order').get((req, res) => {
    orderModel.find((err, order) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Liste de toutes les commandes : ', order });
    });
});



/**
 * Methode POST
 * Ajouter une commande
 */
path.route('/order').post((req, res) => {
    const newOrder = new orderModel({});
    newOrder.total = 0; //req.headers.total
    newOrder.code = newOrder._id+ "code";
    newOrder.save((err) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Ajout de la commande :', newOrder});
    });
});



/**
 * Methode GET
 * Afficher une commande en fonction de son ID
    * @callback order
    * @param {number} id - Id de la commande a recuperer
 */
path.route('/order/:id').get((req, res) => {
    orderModel.find({ _id: req.params.id }, (err, order) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Commande n°' + req.params.id, order });
    });
});



/**
 * Methode DELETE
 * Supprimer une commande
    * @callback findOrder
    * @param {number} id - Id de la commande a recuperer
 */
path.route('/order/:id').delete((req, res) => {
    orderModel.findOne({ _id: req.params.id }, 'status', (err, findOrder) => {
        if (err) {
            throw err;
        }
        if(findOrder.status == "draft"){
            orderModel.deleteOne({ _id: req.params.id }, (err, order) => {
                if (err) {
                    throw err;
                }
                console.log('Commande supprimée : ', req.params.id );
                res.json({ message: "Suppression de la commande n°" + req.params.id , order });
            });
        } else {
            res.json({ message: 'La commande est déjà confirmée. Suppression impossible.'});
        }
        console.log(findOrder.status);
    });
});



/**
 * Methode PUT
 * Modifier une commande
    * @callback findOrder
    * @param {number} id - Id de la commande a recuperer
 */
path.route('/order/:id').put((req, res) => {
    orderModel.findOne({ _id: req.params.id }, 'status', (err, findOrder) =>{
        if (err) {
            throw err;
        }
        if(findOrder.status == "draft"){
            orderModel.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    total: req.headers.total,
                },
            }, {
                sort: { _id: -1 },
                upsert: true,
            }, (err) => {
                res.json({ message: 'Modification de la commande n°' + req.params.id });
            });
        } else {
            res.json({ message: 'La commande est déjà confirmée. Modification impossible.'});
        }
    });
});


module.exports = path;
