const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const mochaPlugin = require('serverless-mocha-plugin');

mochaPlugin.chai.use(require('chai-as-promised'));

const { dynamodb } = require('../utils');
const { SlackDAO } = require('../DAO');

const { expect } = mochaPlugin.chai;
const wrapped = mochaPlugin.getWrapper('authorize', '/handlers/slack/auth.js', 'oauth');

describe('function authorize', () => {
  before((done) => {
    done();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Fails & Errors', () => {
    it('Should ask for property code', async () => {
      const expected = 'Property code is required';
      await expect(wrapped.run({})).to.be.eventually.rejectedWith(expected);
    });

    it('Should reject if authorization does not pass', async () => {
      sinon.stub(SlackDAO, 'slackClient').returns({
        oauth: {
          access: () => Promise.reject(),
        },
      });

      const params = {
        queryStringParameters: {
          code: '111',
        },
      };

      const expected = 'Slack access denyed';
      await expect(wrapped.run(params)).to.be.eventually.rejectedWith(expected);
    });

    it('Should reject if dynamodb rejects | get case', async () => {
      const token = '112a';
      const userId = 1;

      sinon.stub(dynamodb, 'get').returns({
        promise: () => Promise.reject(),
      });

      sinon.stub(SlackDAO, 'slackClient').returns({
        oauth: {
          access: () => Promise.resolve({ token, userId }),
        },
      });

      const params = {
        queryStringParameters: {
          code: '111',
        },
      };

      const expected = 'Database problem';
      await expect(wrapped.run(params)).to.be.eventually.rejectedWith(expected);
    });

    it('Should reject if dynamodb rejects | put case', async () => {
      const token = '112a';
      const userId = 1;

      sinon.stub(dynamodb, 'get').returns({
        promise: () => Promise.resolve(),
      });

      sinon.stub(dynamodb, 'put').returns({
        promise: () => Promise.reject(),
      });

      sinon.stub(SlackDAO, 'slackClient').returns({
        oauth: {
          access: () => Promise.resolve({ token, userId }),
        },
      });

      const params = {
        queryStringParameters: {
          code: '111',
        },
      };

      const expected = 'Database problem';
      await expect(wrapped.run(params)).to.be.eventually.rejectedWith(expected);
    });

    it('Should create a user if not exist and sign', async () => {
      const token = '112a';
      const jwtToken = 'b2dva3';
      const userId = 1;
      let count = 0;

      sinon.stub(dynamodb, 'get').returns({
        promise: () => Promise.resolve(),
      });
      sinon.stub(dynamodb, 'put').returns({
        promise: () => { count += 1; return Promise.resolve(); },
      });

      sinon.stub(jwt, 'sign').returns(jwtToken);
      sinon.stub(SlackDAO, 'slackClient').returns({
        oauth: {
          access: () => Promise.resolve({ token, userId }),
        },
      });

      const params = {
        queryStringParameters: {
          code: '111',
        },
      };

      const expected = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Ok',
            token: jwtToken,
          },
        ),
      };

      await expect(wrapped.run(params)).to.eventually.eql(expected);
      expect(count).to.be.eql(1);
    });

    it('Should not create a user if not exist and sign', async () => {
      const token = '112a';
      const jwtToken = 'b2dva3';
      const userId = 1;
      let count = 0;

      sinon.stub(dynamodb, 'get').returns({
        promise: () => Promise.resolve({ Item: true }),
      });
      sinon.stub(dynamodb, 'put').returns({
        promise: () => { count += 1; return Promise.resolve(); },
      });

      sinon.stub(jwt, 'sign').returns(jwtToken);
      sinon.stub(SlackDAO, 'slackClient').returns({
        oauth: {
          access: () => Promise.resolve({ token, userId }),
        },
      });

      const params = {
        queryStringParameters: {
          code: '111',
        },
      };

      const expected = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Ok',
            token: jwtToken,
          },
        ),
      };

      await expect(wrapped.run(params)).to.eventually.eql(expected);
      expect(count).to.be.eql(0);
    });
  });
});
