const ThunderClient = require('../src/thunder-client');
const sinon         = require('sinon');
const chai          = require('chai');
const request       = require('request');

let expect = chai.expect;

// Constant test values
let baseUrl = 'http://localhost:8080';
let apiKey = 'apiKey';
let apiSecret = 'apiSecret';
let email = 'test@sanctionco.com';
let user = { email: email };

describe('<thunder-client.js>', () => {
  let sandbox = sinon.sandbox.create();
  sandbox.stub(request, 'defaults').returns(request);
  let thunder = new ThunderClient(baseUrl, apiKey, apiSecret);

  afterEach(() => {
    sandbox.restore();
  });

  describe('#createUser()', () => {
    it('uses the correct request data', () => {
      sandbox.stub(request, 'post').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/users');
        expect(ops.json).to.be.true;
        expect(ops.body).to.deep.equal(user);

        callback(null, { statusCode: 201 }, user);
      });

      thunder.createUser(user, (err, result) => {
        expect(result).to.deep.equal(user);
      });
    });

    it('calls back on request error', () => {
      sandbox.stub(request, 'post').callsFake(function(ops, callback) {
        callback(new Error('An error occurred.'));
      });

      thunder.createUser(user, (err, result) => {
        expect(result).to.be.undefined;
        expect(err.message).to.equal('An error occurred.');
      });
    });

    it('calls back on status code error', () => {
      sandbox.stub(request, 'post').callsFake(function(ops, callback) {
        callback(null, { statusCode: 400 }, 'Bad request');
      });

      thunder.createUser(user, (err, result) => {
        expect(err.message).to.equal('The status code 400 does not match expected 201');
        expect(result).to.equal('Bad request');
      });
    });
  });
});

