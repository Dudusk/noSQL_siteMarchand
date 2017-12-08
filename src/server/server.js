const express = require ('express');

class Server {
    constructor() {
        this.express = null;
        this.server = null;
    }

    start(port, callback) {
        this.express = express();

        this.server = this.express.listen(port, (err) => {
            if (typeof callback === 'function') {
            callback(err, this.express);
            console.log('Serveur lancé sur : http://localhost:' + port + "/");
        }
    });
    }
    close(callback) {
        if (this.server === nul) {
            callback(new Error('Le serveur ne fonctionne pas.'));
        } else {
            this.server.close((err) => {
                if (typeof callback === 'function') {
                callback(err);
            }
        });
        }
    }

    getExpress() {
        return this.express;
    }
}

module.exports = new Server();
