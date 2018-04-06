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
let password = 'secure-password';
let token = 'generated-token';
let user = { email: email, password: password };

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
        callback(new Error('A create error occurred.'));
      });

      thunder.createUser(user, (err, result) => {
        expect(result).to.be.undefined;
        expect(err.message).to.equal('A create error occurred.');
      });
    });

    it('calls back on status code error', () => {
      sandbox.stub(request, 'post').callsFake(function(ops, callback) {
        callback(null, { statusCode: 400 }, 'Bad create request');
      });

      thunder.createUser(user, (err, result) => {
        expect(err.message).to.equal('The status code 400 does not match expected 201');
        expect(result).to.equal('Bad create request');
      });
    });
  });

  describe('#getUser()', () => {
    it('uses the correct request data', () => {
      sandbox.stub(request, 'get').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/users');
        expect(ops.qs).to.deep.equal({ email: email });
        expect(ops.headers).to.deep.equal({ password: password});

        callback(null, { statusCode: 200 }, user);
      });

      thunder.getUser(email, password, (err, result) => {
        expect(result).to.deep.equal(user);
      });
    });

    it('calls back on request error', () => {
      sandbox.stub(request, 'get').callsFake(function(ops, callback) {
        callback(new Error('A get error occurred.'));
      });

      thunder.getUser(email, password, (err, result) => {
        expect(result).to.be.undefined;
        expect(err.message).to.equal('A get error occurred.');
      });
    });

    it('calls back on status code error', () => {
      sandbox.stub(request, 'get').callsFake(function(ops, callback) {
        callback(null, { statusCode: 400 }, 'Bad get request');
      });

      thunder.getUser(email, password, (err, result) => {
        expect(err.message).to.equal('The status code 400 does not match expected 200');
        expect(result).to.equal('Bad get request');
      });
    });
  });

  describe('#updateUser()', () => {
    it('uses the correct request data for an email update', () => {
      sandbox.stub(request, 'put').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/users');
        expect(ops.qs).to.deep.equal({ email: email });
        expect(ops.headers).to.deep.equal({ password: password});
        expect(ops.body).to.deep.equal(user);
        expect(ops.json).to.be.true;

        callback(null, { statusCode: 200 }, user);
      });

      thunder.updateUser(email, password, user, (err, result) => {
        expect(result).to.deep.equal(user);
      });
    });

    it('uses the correct query param data for a general update', () => {
      sandbox.stub(request, 'put').callsFake(function(ops, callback) {
        expect(ops.qs).to.deep.equal({});

        callback(null, { statusCode: 200 }, user);
      });

      thunder.updateUser(null, password, user, (err, result) => {
        expect(result).to.deep.equal(user);
      });
    });

    it('calls back on request error', () => {
      sandbox.stub(request, 'put').callsFake(function(ops, callback) {
        callback(new Error('An update error occurred.'));
      });

      thunder.updateUser(email, password, user, (err, result) => {
        expect(result).to.be.undefined;
        expect(err.message).to.equal('An update error occurred.');
      });
    });

    it('calls back on status code error', () => {
      sandbox.stub(request, 'put').callsFake(function(ops, callback) {
        callback(null, { statusCode: 400 }, 'Bad update request');
      });

      thunder.updateUser(email, password, user, (err, result) => {
        expect(err.message).to.equal('The status code 400 does not match expected 200');
        expect(result).to.equal('Bad update request');
      });
    });
  });

  describe('#deleteUser()', () => {
    it('uses the correct request data', () => {
      sandbox.stub(request, 'delete').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/users');
        expect(ops.qs).to.deep.equal({ email: email });
        expect(ops.headers).to.deep.equal({ password: password});

        callback(null, { statusCode: 200 }, user);
      });

      thunder.deleteUser(email, password, (err, result) => {
        expect(result).to.deep.equal(user);
      });
    });

    it('calls back on request error', () => {
      sandbox.stub(request, 'delete').callsFake(function(ops, callback) {
        callback(new Error('A delete error occurred.'));
      });

      thunder.deleteUser(email, password, (err, result) => {
        expect(result).to.be.undefined;
        expect(err.message).to.equal('A delete error occurred.');
      });
    });

    it('calls back on status code error', () => {
      sandbox.stub(request, 'delete').callsFake(function(ops, callback) {
        callback(null, { statusCode: 400 }, 'Bad delete request');
      });

      thunder.deleteUser(email, password, (err, result) => {
        expect(err.message).to.equal('The status code 400 does not match expected 200');
        expect(result).to.equal('Bad delete request');
      });
    });
  });

  describe('#sendEmail()', () => {
    it('uses the correct request data', () => {
      sandbox.stub(request, 'post').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/verify');
        expect(ops.qs).to.deep.equal({ email: email });
        expect(ops.headers).to.deep.equal({ password: password});

        callback(null, { statusCode: 200 }, user);
      });

      thunder.sendEmail(email, password, (err, result) => {
        expect(result).to.deep.equal(user);
      });
    });

    it('calls back on request error', () => {
      sandbox.stub(request, 'post').callsFake(function(ops, callback) {
        callback(new Error('A send email error occurred.'));
      });

      thunder.sendEmail(email, password, (err, result) => {
        expect(result).to.be.undefined;
        expect(err.message).to.equal('A send email error occurred.');
      });
    });

    it('calls back on status code error', () => {
      sandbox.stub(request, 'post').callsFake(function(ops, callback) {
        callback(null, { statusCode: 400 }, 'Bad send email request');
      });

      thunder.sendEmail(email, password, (err, result) => {
        expect(err.message).to.equal('The status code 400 does not match expected 200');
        expect(result).to.equal('Bad send email request');
      });
    });
  });

  describe('#verifyUser()', () => {
    it('uses the correct request data', () => {
      sandbox.stub(request, 'get').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/verify');
        expect(ops.qs).to.deep.equal({ email: email, token: token });

        callback(null, { statusCode: 200 }, user);
      });

      thunder.verifyUser(email, token, (err, result) => {
        expect(result).to.deep.equal(user);
      });
    });

    it('calls back on request error', () => {
      sandbox.stub(request, 'get').callsFake(function(ops, callback) {
        callback(new Error('A verify error occurred.'));
      });

      thunder.verifyUser(email, token, (err, result) => {
        expect(result).to.be.undefined;
        expect(err.message).to.equal('A verify error occurred.');
      });
    });

    it('calls back on status code error', () => {
      sandbox.stub(request, 'get').callsFake(function(ops, callback) {
        callback(null, { statusCode: 400 }, 'Bad verify request');
      });

      thunder.verifyUser(email, token, (err, result) => {
        expect(err.message).to.equal('The status code 400 does not match expected 200');
        expect(result).to.equal('Bad verify request');
      });
    });
  });
});

