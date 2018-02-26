const server = require ('./server/server.js');
const db = require ('../src/mongodb/db.js');
const port = 3001;

const composants = require ('../src/route/composants.js');
const users = require ('../src/route/users.js');


server.start(port, (err, express) => {
    if (!err) {
    server.express.use(composants);
    server.express.use(users);
}
});

db.connexion();
