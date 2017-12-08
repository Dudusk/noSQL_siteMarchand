const express = require('express');
class Webserver {
  constructor() {
    this.express = null;
    this.server = null;
  }

  start(callback) {
    this.express = express();

    this.server = this.express.listen(3000, err => {
      if (typeof callback === 'function') {
        callback(err, this.express);
      }
    });
  }
}

module.exports = new Webserver();