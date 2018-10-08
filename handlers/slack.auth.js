const R = require('ramda');
const jwt = require('jsonwebtoken');

const { ResponseBuilder, buildIAMPolicy } = require('../utils');
const { paths, scopes } = require('../config/slack.config.json');
const { SlackDAO, HistoryDAO } = require('../DAO');

const { CLIENT_ID, JWT_SECRET } = process.env;

const buildParam = ([key, values]) => R.map(v => `${key}=${v}`, values);
const flattenTail = R.compose(R.tail, R.flatten);
const keyValues = R.map(kv => [R.head(kv), flattenTail(kv)]);

const buildParams = R.pipe(R.toPairs, keyValues, R.map(buildParam), R.flatten, R.join('&'));

const commas = R.join(',');

module.exports.button = (event, context, callback) => {
  const params = {
    scope: commas(scopes),
    client_id: CLIENT_ID,
  };

  const slackButton = `${paths.button}?${buildParams(params)}`;
  const responseBuilder = new ResponseBuilder(callback, { slack_button: slackButton });

  responseBuilder.exec();
};

module.exports.authorize = async (event, context, callback) => {
  const { authorizationToken } = event;

  const responseBuilder = new ResponseBuilder(callback);
  const unauthorized = () => {
    responseBuilder.setStatus(401);
    responseBuilder.setMessage('Unauthorized');
    responseBuilder.exec();
  };

  if (!authorizationToken) {
    return unauthorized();
  }

  try {
    const decoded = jwt.verify(authorizationToken, JWT_SECRET);
    const { token, userId } = decoded;

    const slackDao = new SlackDAO(token);

    if (await !slackDao.isAuthorized()) {
      return unauthorized();
    }

    const policyDocument = buildIAMPolicy(userId, 'Allow', event.methodArn, { token, userId });

    return callback(null, policyDocument);
  } catch (e) {
    return unauthorized();
  }
};

module.exports.oauth = async (event, context, callback) => {
  const { code } = event.queryStringParameters;

  try {
    const slackDao = new SlackDAO();
    const { slackToken, userId } = await slackDao.authorize(code);

    const historyDao = new HistoryDAO(userId);
    await historyDao.createUserIfNotExists();

    const token = jwt.sign({ token: slackToken, userId }, JWT_SECRET);

    const responseBuilder = new ResponseBuilder(callback, { token });

    responseBuilder.exec();
  } catch (e) {
    const responseBuilder = new ResponseBuilder(callback);
    responseBuilder.setStatus(500);
    responseBuilder.setMessage('Database problem');

    responseBuilder.exec();
  }
};
