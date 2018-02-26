const express           = require ('express');
const db                = require ('../mongodb/db.js');
const rooterPath        = express.Router();
const pathed            = require("path");

const composantsModel   = db.modelComposants();


/**
 * Methode GET
 * Lister tous les produits
    * @callback product
 */
rooterPath.route('/composants/getAll').get((req, res) => {
    // composantsModel.find((err, composants) => {
    //     if (err) {
    //         throw err;
    //     }
    //     //res.render('index', { title: 'The index page!' })
    //     res.json({ message: 'Liste de tous les composants :', composants });
    //     //res.sendFile(pathed.join(__dirname + '/index.html'));
    //     res.send("ae<br />e");
    // })

    var options = {
        root: __dirname + '/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = "index.html";
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('Sent:', fileName);
        }
    });

});

rooterPath.route('/composants/add').get((req, res) => {
    composantsModel.find((err, composants) => {
        if (err) {
            throw err;
        }
        //res.render('index', { title: 'The index page!' })
        //res.json({ message: 'Liste de tous les composants :', composants });
        res.sendFile(pathed.join(__dirname + '/index.html', "composant"));
    })
});



/**
 * Methode POST
 * Ajouter un produit
    * @param {string} name - Nom du produit
    * @param {number} price - Prix du produit
 */
rooterPath.route('/composants').post((req, res) => {

console.log(res)
    const newComposants = new composantsModel({});
     newComposants.nom = req.body.name_field;
     newComposants.prix = req.body.prix;
     newComposants.save((err) => {
         if (err) {
             throw err;
         }
         res.json({message: 'Ajout du composant :', newComposants});
     });
});


/**
 * Methode GET
 * Afficher un produit en fonction de son ID
    * @param {number} id - Id du produit a recuperer
    * @callback product
 */
rooterPath.route('/composants/:id').get((req, res) => {
    composantsModel.find({_id: req.params.id}, (err, composants) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Composant n°' + req.params.id, composants});
    });
});



/**
 * Methode DELETE
 * Supprimer un produit
    * @param {number} id - Id du produit a supprimer
    * @callback product
 */
rooterPath.route('/composants/:id').delete((req, res) => {
    composantsModel.deleteOne({ _id: req.params.id }, (err, composants) =>{
        if (err) {
            throw err;
        }
        console.log('Composant supprimé : ' + req.params.id);
        res.json({ message: 'Suppression du composant n°' + req.params.id, composants });
    });
});



/**
 * Methode PUT
 * Modifier un produit
    * @param {number} id - Id du produit a modifier
    * @param {string} name - Nom du produit
    * @param {number} price - Prix du produit
 */
rooterPath.route('/composants/:id').put((req, res) => {
    composantsModel.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.headers.name,
            price: req.headers.price
        },
    },
    {
        sort: {id: -1 },
        upsert: true,
    }, (err, res) => {
        res.json({ message: 'Modification du composant n°' + req.params.id + composants });
    });
});


module.exports = rooterPath;
