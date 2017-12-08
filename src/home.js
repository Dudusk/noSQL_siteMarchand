const webserver = require ('./server/server.js');
const orderline = require ('../src/route/orderline.js');
const metier = require ('../src/route/metier.js');
const product = require ('../src/route/product.js');
const order = require ('../src/route/order.js');
const db = require ('../src/mongodb/db.js');

console.log(webserver);

webserver.start(3001, (err, express) => {
    if (!err) {
        console.log('Server is starting !');
        webserver.express.use(orderline);
        webserver.express.use(metier);
        webserver.express.use(product);
        webserver.express.use(order);
    }
});

db.start();
