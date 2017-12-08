const mongoose = require ('mongoose');

let productSchema,
    orderSchema,
    orderLineSchema;
let productModel,
    orderModel,
    orderLineModel;

class Db {
    constructor() {
        this.database = null;

        this.productSchema = new mongoose.Schema({
            name: String,
            price: Number,
        });
        this.orderSchema = new mongoose.Schema({
            code: String,
            date: { type: Date, default: Date.now },
            total: Number,
            status: { type: String, default: 'draft' },
        });
        this.orderLineSchema = new mongoose.Schema({
            product: String,
            order: String,
            quantity: Number,
        });
    }

    start() {
        this.database = mongoose.connect('mongodb://127.0.0.1:27017/data', { useMongoClient: true }, (err) => {
            if (err) {
                throw err;
            }
        });
    }

    getMongoose() {
        return mongoose;
    }

    modelOrder() {
        if (this.orderModel == null) {
            this.orderModel = mongoose.model('order', this.orderSchema);
        }
        return this.orderModel;
    }

    modelProduct() {
        if (this.productModel == null) {
            this.productModel = mongoose.model('product', this.productSchema);
        }
        return this.productModel;
    }

    modelOrderLine() {
        if (this.orderLineModel == null) {
            this.orderLineModel = mongoose.model('orderLine', this.orderLineSchema);
        }
        return this.orderLineModel;
    }
}
module.exports = new Db();
