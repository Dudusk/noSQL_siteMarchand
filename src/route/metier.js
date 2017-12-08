const express = require ('express');
const db = require ('../mongodb/db.js');

const path = express.Router();
const productModel = db.modelProduct();
const orderLineModel = db.modelOrderLine();
const orderModel = db.modelOrder();


// Page d'accueil
path.route('/').all((req, res) => {
    res.json({ message: `Page d'accueil. v1.0`});
});

/**
 * Methode PUT
 * Confirmer une commande : passe le champ statut a confirmed» avec l'Id de la commande
    * @param {number} id - Id de la commande a recuperer
 */
path.route('/order/:id/confirm').put((req, res) => {
    let price,
        orderId;

    orderId = req.params.id;

    /**
     * Calcul du total de l'order.<br/><br/>
     * 
     * Test le prix de l'article dedans * quantite :<br/>
     * - get le PRICE du PRODUCT avec l'id qui est dans orderLine (orderline.PRODUCT)<br/>
     * - get la QUANTITY de ce product dans orderLine<br/>
     * - Multiplication du PRICE par QUANTITY<br/>
        * @callback orderLine
        * @callback products
     */
    orderLineModel.findOne({ order: orderId }, 'quantity product', function (err, orderLine) {
        if (err) return handleError(err);
        productModel.findOne({ _id: orderLine.product }, 'price', function (err, products) {
            if (err) return handleError(err);
            price = products.price;
            orderModel.findOneAndUpdate({ _id: orderId }, {
                $set: {
                    status: "confirmed",
                    total: (products.price * orderLine.quantity).toFixed(2)
                },
            }, {
                sort: { _id: -1 },
                upsert: true,
            }, (err, result) => {
                if(err) throw err;
                console.log("Confirmation de la commande nÂ°" + orderId);
                res.json({ message: `Confirmation de la commande n°${orderId}`});
                console.log(result);
            });
        });
    });
});


/**
 * Methode GET
 * Affiche le chiffre d'affaire par mois
    * @callback order
 */

path.route('/dashboard/orders').get((req, res) => {
    let mois = new Array;
    let chiffre = new Array();

    orderModel.find({}, 'date', function(err, order) {
        if (err) {
            throw err;
        }
        for(var i = 0 ; i < order.length; i++){
            console.log(order);
            mois.push(order[i].date);
            console.log(mois[i].getMonth()); //Affiche le numero du mois
        }

        // res.json({ message: 'Chiffre d\'affaire : ' + mois.getMonth() });
        res.json({ message: 'Chiffre d\'affaire : '});
    });

    //res.json({ message: "Chiffre d'affaire par mois" });
});


/**
 * Methode GET
 * Affiche le produit le plus vendu
    * @callback orderLine
 */

path.route('/dashboard/product').get((req, res) => {
    let idOfProduct = new Array();
    let product;

    orderLineModel.find({}, 'product', function(err, orderLine) {
        if (err) {
            throw err;
        }
        for(var i = 0 ; i < orderLine.length; i++){
            idOfProduct.push(orderLine[i].product);
        }
        console.log(idOfProduct); //Affiche le numero du mois

    });
    res.json({ message: 'Le produit inclus dans le plus de commandes ' });
});


module.exports = path;