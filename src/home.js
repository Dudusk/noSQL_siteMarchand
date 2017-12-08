const server = require ('./server/server.js');
const db = require ('../src/mongodb/db.js');
const port = 3001;

const orderline = require ('../src/route/orderline.js');
const metier = require ('../src/route/metier.js');
const product = require ('../src/route/product.js');
const order = require ('../src/route/order.js');


server.start(port, (err, express) => {
    if (!err) {
    server.express.use(orderline);
    server.express.use(metier);
    server.express.use(product);
    server.express.use(order);
}
});

db.connexion();
