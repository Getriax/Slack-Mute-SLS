const R = require('ramda');
const jwt = require('jsonwebtoken');
const { WebClient } = require('@slack/client');

const { ResponseBuilder, buildIAMPolicy, dynamodb } = require('../utils');
const { paths, scopes } = require('../config/slack.config.json');

const { CLIENT_ID, CLIENT_SECRET, JWT_SECRET } = process.env;

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

const isAuthorized = async (slackToken) => {
  const web = new WebClient(slackToken);

  try {
    const { ok } = web.auth.test();
    return ok;
  } catch (e) {
    return false;
  }
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

    if (await !isAuthorized(token)) {
      return unauthorized();
    }

    const policyDocument = buildIAMPolicy(userId, 'Allow', event.methodArn, { token, userId });

    return callback(null, policyDocument);
  } catch (e) {
    return unauthorized();
  }
};

const createUserDataIfNotExist = async (uid) => {
  const TableName = process.env.DYNAMODB_TABLE;

  try {
    const response = await dynamodb.get({
      TableName,
      Key: {
        uid,
      },
    }).promise();

    if (!response.Item) {
      const created = Date.now();

      await dynamodb.put({
        TableName,
        Item: {
          uid,
          created,
          history: [],
        },
      }).promise();
    }
  } catch (e) {
    throw new Error('Database problem');
  }
};

module.exports.oauth = async (event, context, callback) => {
  const { code } = event.queryStringParameters;

  const params = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
  };

  const web = new WebClient();

  const data = await web.oauth.access(params);

  const slackToken = data.access_token;
  const userId = data.user_id;

  try {
    await createUserDataIfNotExist(userId);

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
