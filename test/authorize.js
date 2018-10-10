const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const mochaPlugin = require('serverless-mocha-plugin');

mochaPlugin.chai.use(require('chai-as-promised'));

const { SlackDAO } = require('../DAO');

const { expect } = mochaPlugin.chai;
const wrapped = mochaPlugin.getWrapper('authorize', '/handlers/slack/auth.js', 'authorize');

describe('function authorize', () => {
  before((done) => {
    done();
  });

  afterEach(() => sinon.restore());

  describe('Unauthorized cases', () => {
    it('no token provided', async () => {
      await expect(wrapped.run({})).to.be.eventually.rejectedWith('Unauthorized');
    });

    it('fails slack verification', async () => {
      sinon.stub(jwt, 'verify').returns({ token: 'fake', userId: 'aso fake' });
      sinon.stub(SlackDAO, 'slackClient').returns({
        auth: {
          test: () => Promise.resolve({ ok: false }),
        },
      });

      const params = {
        authorizationToken: 'renadom',
      };

      await expect(wrapped.run(params)).to.be.eventually.rejectedWith('Unauthorized');
    });

    it('Should return unauthorized if jwt throws an error', async () => {
      sinon.stub(jwt, 'verify').throws();

      const params = {
        authorizationToken: 'renadom',
      };

      await expect(wrapped.run(params)).to.be.eventually.rejectedWith('Unauthorized');
    });
  });

  it('Shout authorize the user', async () => {
    const token = '123a';
    const userId = 1;
    sinon.stub(jwt, 'verify').returns({ token, userId });
    sinon.stub(SlackDAO, 'slackClient').returns({
      web: {
        auth: {
          test: () => Promise.resolve({ ok: true }),
        },
      },
    });

    const methodArn = 'some method';

    const expected = {
      principalId: userId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: methodArn,
          },
        ],
      },
      context: { token, userId },
    };

    const params = {
      authorizationToken: 'renadom',
      methodArn,
    };

    await expect(wrapped.run(params)).to.eventually.eql(expected);
  });
});
