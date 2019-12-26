const ThunderClient = require('../src/thunder-client');
const sinon         = require('sinon');
const chai          = require('chai');
const request       = require('request');

const expect = chai.expect;

// Constant test values
const baseUrl = 'http://localhost:8080';
const apiKey = 'apiKey';
const apiSecret = 'apiSecret';
const email = 'test@sanctionco.com';
const password = 'secure-password';
const token = 'generated-token';
const user = { email: email, password: password };

describe('<thunder-client.js>', () => {
  sinon.stub(request, 'defaults').returns(request);
  const thunder = new ThunderClient(baseUrl, apiKey, apiSecret);

  afterEach(() => {
    sinon.restore();
  });

  describe('#createUser()', () => {
    it('uses the correct request data', () => {
      sinon.stub(request, 'post').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/users');
        expect(ops.json).to.be.true;
        expect(ops.body).to.deep.equal(user);

        callback(null, { statusCode: 201 }, user);
      });

      thunder.createUser(user, (err, statusCode, result) => {
        expect(result).to.deep.equal(user);
        expect(statusCode).to.equal(201);
      });
    });

    it('calls back on request error', () => {
      sinon.stub(request, 'post').callsFake(function(ops, callback) {
        callback(new Error('A create error occurred.'));
      });

      thunder.createUser(user, (err, statusCode, result) => {
        expect(result).to.be.undefined;
        expect(statusCode).to.be.undefined;
        expect(err.message).to.equal('A create error occurred.');
      });
    });

    it('calls back on status code error', () => {
      sinon.stub(request, 'post').callsFake(function(ops, callback) {
        callback(null, { statusCode: 400 }, 'Bad create request');
      });

      thunder.createUser(user, (err, statusCode, result) => {
        expect(err.message).to.equal('The status code 400 does not match expected 201');
        expect(result).to.equal('Bad create request');
        expect(statusCode).to.equal(400);
      });
    });
  });

  describe('#getUser()', () => {
    it('uses the correct request data', () => {
      sinon.stub(request, 'get').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/users');
        expect(ops.qs).to.deep.equal({ email: email });
        expect(ops.headers).to.deep.equal({ password: password });

        callback(null, { statusCode: 200 }, user);
      });

      thunder.getUser(email, password, (err, statusCode, result) => {
        expect(result).to.deep.equal(user);
        expect(statusCode).to.equal(200);
      });
    });

    it('calls back on request error', () => {
      sinon.stub(request, 'get').callsFake(function(ops, callback) {
        callback(new Error('A get error occurred.'));
      });

      thunder.getUser(email, password, (err, statusCode, result) => {
        expect(result).to.be.undefined;
        expect(statusCode).to.be.undefined;
        expect(err.message).to.equal('A get error occurred.');
      });
    });

    it('calls back on status code error', () => {
      sinon.stub(request, 'get').callsFake(function(ops, callback) {
        callback(null, { statusCode: 400 }, 'Bad get request');
      });

      thunder.getUser(email, password, (err, statusCode, result) => {
        expect(err.message).to.equal('The status code 400 does not match expected 200');
        expect(result).to.equal('Bad get request');
        expect(statusCode).to.equal(400);
      });
    });
  });

  describe('#updateUser()', () => {
    it('uses the correct request data for an email update', () => {
      sinon.stub(request, 'put').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/users');
        expect(ops.qs).to.deep.equal({ email: email });
        expect(ops.headers).to.deep.equal({ password: password });
        expect(ops.body).to.deep.equal(user);
        expect(ops.json).to.be.true;

        callback(null, { statusCode: 200 }, user);
      });

      thunder.updateUser(email, password, user, (err, statusCode, result) => {
        expect(result).to.deep.equal(user);
        expect(statusCode).to.equal(200);
      });
    });

    it('uses the correct query param data for a general update', () => {
      sinon.stub(request, 'put').callsFake(function(ops, callback) {
        expect(ops.qs).to.deep.equal({});

        callback(null, { statusCode: 200 }, user);
      });

      thunder.updateUser(null, password, user, (err, statusCode, result) => {
        expect(result).to.deep.equal(user);
        expect(statusCode).to.equal(200);
      });
    });

    it('calls back on request error', () => {
      sinon.stub(request, 'put').callsFake(function(ops, callback) {
        callback(new Error('An update error occurred.'));
      });

      thunder.updateUser(email, password, user, (err, statusCode, result) => {
        expect(result).to.be.undefined;
        expect(statusCode).to.be.undefined;
        expect(err.message).to.equal('An update error occurred.');
      });
    });

    it('calls back on status code error', () => {
      sinon.stub(request, 'put').callsFake(function(ops, callback) {
        callback(null, { statusCode: 400 }, 'Bad update request');
      });

      thunder.updateUser(email, password, user, (err, statusCode, result) => {
        expect(err.message).to.equal('The status code 400 does not match expected 200');
        expect(result).to.equal('Bad update request');
        expect(statusCode).to.equal(400);
      });
    });
  });

  describe('#deleteUser()', () => {
    it('uses the correct request data', () => {
      sinon.stub(request, 'delete').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/users');
        expect(ops.qs).to.deep.equal({ email: email });
        expect(ops.headers).to.deep.equal({ password: password });

        callback(null, { statusCode: 200 }, user);
      });

      thunder.deleteUser(email, password, (err, statusCode, result) => {
        expect(result).to.deep.equal(user);
        expect(statusCode).to.equal(200);
      });
    });

    it('calls back on request error', () => {
      sinon.stub(request, 'delete').callsFake(function(ops, callback) {
        callback(new Error('A delete error occurred.'));
      });

      thunder.deleteUser(email, password, (err, statusCode, result) => {
        expect(result).to.be.undefined;
        expect(statusCode).to.be.undefined;
        expect(err.message).to.equal('A delete error occurred.');
      });
    });

    it('calls back on status code error', () => {
      sinon.stub(request, 'delete').callsFake(function(ops, callback) {
        callback(null, { statusCode: 400 }, 'Bad delete request');
      });

      thunder.deleteUser(email, password, (err, statusCode, result) => {
        expect(err.message).to.equal('The status code 400 does not match expected 200');
        expect(result).to.equal('Bad delete request');
        expect(statusCode).to.equal(400);
      });
    });
  });

  describe('#sendEmail()', () => {
    it('uses the correct request data', () => {
      sinon.stub(request, 'post').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/verify');
        expect(ops.qs).to.deep.equal({ email: email });
        expect(ops.headers).to.deep.equal({ password: password });

        callback(null, { statusCode: 200 }, user);
      });

      thunder.sendEmail(email, password, (err, statusCode, result) => {
        expect(result).to.deep.equal(user);
        expect(statusCode).to.equal(200);
      });
    });

    it('calls back on request error', () => {
      sinon.stub(request, 'post').callsFake(function(ops, callback) {
        callback(new Error('A send email error occurred.'));
      });

      thunder.sendEmail(email, password, (err, statusCode, result) => {
        expect(result).to.be.undefined;
        expect(statusCode).to.be.undefined;
        expect(err.message).to.equal('A send email error occurred.');
      });
    });

    it('calls back on status code error', () => {
      sinon.stub(request, 'post').callsFake(function(ops, callback) {
        callback(null, { statusCode: 400 }, 'Bad send email request');
      });

      thunder.sendEmail(email, password, (err, statusCode, result) => {
        expect(err.message).to.equal('The status code 400 does not match expected 200');
        expect(result).to.equal('Bad send email request');
        expect(statusCode).to.equal(400);
      });
    });
  });

  describe('#verifyUser()', () => {
    it('uses the correct default request data', () => {
      sinon.stub(request, 'get').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/verify');
        expect(ops.qs).to.deep.equal({ email: email, token: token, response_type: 'json' });

        callback(null, { statusCode: 200 }, user);
      });

      thunder.verifyUser(email, token, (err, statusCode, result) => {
        expect(result).to.deep.equal(user);
        expect(statusCode).to.equal(200);
      });
    });

    it('uses the correct request data when HTML is specified', () => {
      sinon.stub(request, 'get').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/verify');
        expect(ops.qs).to.deep.equal({ email: email, token: token, response_type: 'html' });

        callback(null, { statusCode: 200 }, user);
      });

      thunder.verifyUser(email, token, (err, statusCode, result) => {
        expect(result).to.deep.equal(user);
        expect(statusCode).to.equal(200);
      }, 'html');
    });

    it('uses the correct request data when JSON is specified', () => {
      sinon.stub(request, 'get').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/verify');
        expect(ops.qs).to.deep.equal({ email: email, token: token, response_type: 'json' });

        callback(null, { statusCode: 200 }, user);
      });

      thunder.verifyUser(email, token, (err, statusCode, result) => {
        expect(result).to.deep.equal(user);
        expect(statusCode).to.equal(200);
      }, 'json');
    });

    it('calls back on bad responseType error', () => {
      thunder.verifyUser(email, token, (err, statusCode, result) => {
        expect(result).to.be.undefined;
        expect(statusCode).to.be.undefined;
        expect(err.message).to.equal('The response type badType is not accepted.' +
            '\nUse either "html" or "json".');
      }, 'badType');
    });

    it('calls back on request error', () => {
      sinon.stub(request, 'get').callsFake(function(ops, callback) {
        callback(new Error('A verify error occurred.'));
      });

      thunder.verifyUser(email, token, (err, statusCode, result) => {
        expect(result).to.be.undefined;
        expect(statusCode).to.be.undefined;
        expect(err.message).to.equal('A verify error occurred.');
      });
    });

    it('calls back on status code error', () => {
      sinon.stub(request, 'get').callsFake(function(ops, callback) {
        callback(null, { statusCode: 400 }, 'Bad verify request');
      });

      thunder.verifyUser(email, token, (err, statusCode, result) => {
        expect(err.message).to.equal('The status code 400 does not match expected 200');
        expect(result).to.equal('Bad verify request');
        expect(statusCode).to.equal(400);
      });
    });
  });

  describe('#resetVerificationStatus()', () => {
    it('uses the correct request data', () => {
      sinon.stub(request, 'post').callsFake(function(ops, callback) {
        expect(ops.url).to.equal('/verify/reset');
        expect(ops.qs).to.deep.equal({ email: email });
        expect(ops.headers).to.deep.equal({ password: password });

        callback(null, { statusCode: 200 }, user);
      });

      thunder.resetVerificationStatus(email, password, (err, statusCode, result) => {
        expect(result).to.deep.equal(user);
        expect(statusCode).to.equal(200);
      });
    });

    it('calls back on request error', () => {
      sinon.stub(request, 'post').callsFake(function(ops, callback) {
        callback(new Error('A send email error occurred.'));
      });

      thunder.resetVerificationStatus(email, password, (err, statusCode, result) => {
        expect(result).to.be.undefined;
        expect(statusCode).to.be.undefined;
        expect(err.message).to.equal('A send email error occurred.');
      });
    });

    it('calls back on status code error', () => {
      sinon.stub(request, 'post').callsFake(function(ops, callback) {
        callback(null, { statusCode: 400 }, 'Bad reset verification status request');
      });

      thunder.resetVerificationStatus(email, password, (err, statusCode, result) => {
        expect(err.message).to.equal('The status code 400 does not match expected 200');
        expect(result).to.equal('Bad reset verification status request');
        expect(statusCode).to.equal(400);
      });
    });
  });
});

