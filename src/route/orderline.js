const express = require ('express');
const db = require ('../mongodb/db.js');
const path = express.Router();
const orderLineModel = db.modelOrderLine();
const orderModel =db.modelOrder();


/**
 * Methode GET
 * Liste toutes les lignes de commandes
 */
path.route('/order/line').get((req, res) => {
    orderLineModel.find((error, orderLine) => {
        if (error) {
            throw error;
        }
        res.json({ message: 'Liste de toutes les lignes de commandes : ', orderLine });
    });
});



/**
 * Methode POST
 * Ajouter une ligne de commande
    * @param {string} product - Nom du pro
    * @param {number} order_id - Id de la commande a mettre a jour
    * @param {number} quantity - Quantite de produit
 */

path.route('/order/:order_id/line').post((req, res) => {
    const newOrderLine = new orderLineModel({});
    newOrderLine.product = req.headers.product;
    newOrderLine.order = req.params.order_id;
    newOrderLine.quantity = req.headers.quantity;
    newOrderLine.save((err) => {
        if (err) {
            throw err;
        }
        res.json(newOrderLine);
    });
});



/**
* Methode DELETE
* Supprimer une ligne de commande
 * @callback findOrder
 * @callback orderline
 * @param {number} order_id - Id de la commande a supprimer
 * @param {number} line_id - Id de la OrderLine a supprimer
*/
path.route('/order/:order_id/line/:line_id').delete((req, res) => {
    orderModel.findOne({ _id: req.params.order_id }, 'status', (err, findOrder) => {
        if (err) {
            throw err;
        }
        if(findOrder.status == "draft"){
            orderLineModel.deleteOne({ _id: req.params.line_id }, (err, orderLine) => {
                if (err) {
                    throw err;
                }
                console.log('Ligne de commande supprimée : ' + req.params.line_id);
                res.json({ message: 'Suppression de la ligne de commande n°', orderLine: orderLine });
            });
        } else {
            res.json({ message: 'La commande est déjà confirmée. La suppression de la ligne de commande est impossible.'});
        }
    });
});



/**
 * Methode PUT
 * Modifier une ligne de commande
    * @param {number} order_id - Id de la commande a modifier
    * @param {number} line_id - Id de la line a modifier
    * @param {string} product - Nom du produit
    * @param {string} product - Nom du produit
    * @param {number} order - Id de la commande
    * @param {number} quantity - Quantite de produit
    * @callback findOrder
 */
path.route('/order/:order_id/line/:line_id').put((req, res) => {
    orderModel.findOne({ _id: req.params.order_id }, 'status', (err, findOrder) => {
        if (err) {
            throw err;
        }
        if(findOrder.status == "draft"){
            orderLineModel.findOneAndUpdate({ _id: req.params.line_id }, {
                $set: {
                    product: req.headers.product,
                    order: req.headers.order,
                    quantity: req.headers.quantity,
                },
            }, {
                sort: { _id: -1 },
                upsert: true,
            }, (err, res) => {
                if(err) throw err;
                res.json({ message: 'Modification de la ligne de commande n°' + req.params.line_id });
            });
        } else {
            res.json({ message: 'La commande est déjà confirmée. Modification de la ligne de commande impossible.'});
        }
    });
});


module.exports = path;
