const express = require ('express');

class serverWeb {
    constructor() {
        this.express = null;
        this.server = null;
    }

    start(port, callback) {
        this.express = express();

        this.server = this.express.listen(port, (err) => {
            if (typeof callback === 'function') {
                callback(err, this.express);
            }
        });
    }
    close(callback) {
        if (this.server === null) {
            callback(new Error('Web Server is not running'));
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

module.exports = new serverWeb();
