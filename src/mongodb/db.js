const mongoose = require ('mongoose');

//Schemas
let composantsSchema, usersSchema;
//Models
let composantsModel, usersModel;


class Db {
    constructor() {
        this.database = null;

        this.composantsSchema = new mongoose.Schema({
            nom: {
                type: String,
                description: "Le nom du produit"
            },
            marque: {
                type: Number,
                description: "La marque du produit"
            },
            type: {
                type: String,
                description: "Type du produit"
            },
            code_barre: {
                type: String,
                description: "Le code barre du produit"
            },
            prix: {
                type: String,
                description: "Le prix du produit"
            },
            desc_technique: {
                type: String,
                description: "Description technique"
            },
            commentaire: {
                type: String,
                description: "Le commentaire de l'utilisateur"
            },
            note: {
                type: String,
                description: "La note de l'utilisateur"
            },
            compatibilite: {
                type: Object,
                description: "L'id avec les composants compatible avec celui-la"
            }
        });
        this.usersSchema = new mongoose.Schema({
            nom: {
                type: String,
                description: "Le nom de l'utilisateur"
            },
            prenom: {
                type: Number,
                description: "Le prenom de l'utilisateur"
            },
            adresse: {
                type: String,
                description: "L'adresse de l'utilisateur"
            },
            tel: {
                type: String,
                description: "Le tel de l'utilisateur"
            },
            login: {
                type: String,
                description: "login"
            },
            password: {
                type: String,
                description: "password"
            }
        });
    }

    connexion() {
        this.database = mongoose.connect('mongodb://127.0.0.1/LDLClevelTwo', { useMongoClient: true }, (err) => {
            if (err) {
                throw err;
            }
        });
    }

    getMongoose() {
        return mongoose;
    }

    modelComposants() {
        if (this.composantsModel == null) {
            this.composantsModel = mongoose.model('composants', this.composantsSchema);
        }
        return this.composantsModel;
    }

    modelUsers() {
        if (this.usersModel == null) {
            this.usersModel = mongoose.model('users', this.usersSchema);
        }
        return this.usersModel;
    }
}


module.exports = new Db();
