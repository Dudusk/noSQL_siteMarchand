const { expect } = require ('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const webserver = require ('../src/server/server.js');
const orderline = require ('../src/route/orderline.js');
const metier = require ('../src/route/metier.js');
const product = require ('../src/route/product.js');
const order = require ('../src/route/order.js');


var id = null;
chai.use(chaiHttp);


describe('Test', function() {
  it('Test connexion server', function(done){
    webserver.start(3002, (err, express) => {
        if (!err) {
            webserver.express.use(metier);
            webserver.express.use(product);
            webserver.express.use(orderline);
            webserver.express.use(order);
            expect(true).to.be.true;
        }else{
          expect(err).to.be.not.null;
        }

    });
    done();
  });

});

describe('Test GET, POST, PUT, DELETE', function() {
  it('Lister les commandes /order GET', function(done) {
    chai.request('http://localhost:3001')
      .get('/order')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Ajouter une commande /order POST', function(done) {
    chai.request('http://localhost:3001')
      .post('/order')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        id = res.body['newOrder']['_id'];
        done();
      });
  });

  it('Supprimer une commande /order/:id DELETE', function(done) {
    chai.request('http://localhost:3001')
      .delete('/order/'+id)
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Ajouter une commande : test PUT /order POST', function(done) {
    chai.request('http://localhost:3001')
      .post('/order')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        id = res.body['newOrder']['_id'];
        done();
      });
  });

  it('Modifier une commande /order/:id PUT', function(done) {
    chai.request('http://localhost:3001')
      .put('/order/'+id)
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        done();
      });
  });


});
