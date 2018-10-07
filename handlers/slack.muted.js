const { WebClient } = require('@slack/client');
const { ResponseBuilder, Ramda, dynamodb } = require('../utils');

const { splitCommas, joinCommas, transformChannels } = Ramda;

module.exports.get = async (event, context, callback) => {
  const { token } = event.requestContext.authorizer;
  const web = new WebClient(token);

  const { prefs } = await web.users.prefs.get();

  const muted = splitCommas(prefs.muted_channels);

  const allChannels = await web.conversations.list({
    limit: 1000,
    types: 'public_channel,private_channel',
  });
  const channels = transformChannels(allChannels.channels);

  const responseBuilder = new ResponseBuilder(callback, { channels, muted });
  responseBuilder.exec();
};

const appendUserHistory = async (uid, value) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      uid,
    },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'set #history = list_append(if_not_exists(#history, :empty_list), :muted)',
    ExpressionAttributeNames: {
      '#history': 'history',
    },
    ExpressionAttributeValues: {
      ':muted': [value],
      ':empty_list': [],
    },
  };

  await dynamodb.update(params).promise();
};

module.exports.set = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const muttedChnnelsIds = data.muted_channels;

  const { token, userId } = event.requestContext.authorizer;
  const web = new WebClient(token);

  const prefs = { muted_channels: joinCommas(muttedChnnelsIds) };

  const responseBuilder = new ResponseBuilder(callback);
  try {
    const response = await web.users.prefs.set({ prefs });
    const muted = response.prefs.muted_channels;

    const ts = Date.now();
    const appendValue = { muted, ts };

    responseBuilder.addParams(appendValue);

    await appendUserHistory(userId, appendValue);

    responseBuilder.exec();
  } catch (e) {
    responseBuilder.setStatus(500);
    responseBuilder.setMessage('Error while setting the muted channels');
    responseBuilder.exec();
  }
};
