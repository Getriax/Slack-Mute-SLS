import * as R from 'ramda';
import * as jwt from 'jsonwebtoken';

import { ResponseBuilder, buildIAMPolicy } from '../../utils';
import { paths, scopes } from '../../config/slack.config.json';
import { SlackDAO, HistoryDAO } from '../../DAO';

const { CLIENT_ID, JWT_SECRET } = process.env;

const buildParam = ([key, values]) => R.map(v => `${key}=${v}`, values);
const flattenTail = R.compose(R.tail, R.flatten);
const keyValues = R.map(kv => [R.head(kv), flattenTail(kv)]);

const buildParams = R.pipe(R.toPairs, keyValues, R.map(buildParam), R.flatten, R.join('&'));

const commas = R.join(',');

export const button = (event, context, callback) => {
  const params = {
    scope: commas(scopes),
    client_id: CLIENT_ID,
  };

  const slackButton = `${paths.button}?${buildParams(params)}`;
  const responseBuilder = new ResponseBuilder(callback, { slack_button: slackButton });

  responseBuilder.exec();
};

export const authorize = async (event, context, callback) => {
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

    const authorized = await slackDao.isAuthorized();

    if (!authorized) {
      return unauthorized();
    }

    const policyDocument = buildIAMPolicy(userId, 'Allow', '*', { token, userId });

    return callback(null, policyDocument);
  } catch (e) {
    return unauthorized();
  }
};

export const oauth = async (event, context, callback) => {
  let code;
  if (event && event.queryStringParameters) {
    ({ code } = event.queryStringParameters);
  }

  const responseBuilder = new ResponseBuilder(callback);

  if (!code) {
    responseBuilder.setStatus(403);
    responseBuilder.setMessage('Property code is required');
    return responseBuilder.exec();
  }

  try {
    const slackDao = new SlackDAO();
    const { slackToken, userId } = await slackDao.authorize(code);

    const historyDao = new HistoryDAO(userId);
    await historyDao.createUserIfNotExists();

    const token = jwt.sign({ token: slackToken, userId }, JWT_SECRET);
    responseBuilder.addParams({ token });

    return responseBuilder.exec();
  } catch (e) {
    console.log(e);
    responseBuilder.setStatus(500);
    responseBuilder.setMessage(e.message);

    return responseBuilder.exec();
  }
};
