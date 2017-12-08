const webserver = require('../webserver/test.js');

console.log(webserver);
webserver.start(err => {
  if (!err) {
    console.log('Webserver started');
  }
});