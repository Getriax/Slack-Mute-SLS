const { WebClient } = require('@slack/client');
const { map } = require('asyncro');

const { ResponseBuilder, Ramda } = require('../utils');

const { commas, transformChannels } = Ramda;

module.exports.get = async (event, context, callback) => {
  const { token } = event.requestContext.authorizer;
  const web = new WebClient(token);

  const { prefs } = await web.users.prefs.get();

  const ids = commas(prefs.muted_channels);

  const muttedChannels = await map(ids, async (channel) => {
    try {
      return await web.channels.info({ channel });
    } catch (e) {
      return undefined;
    }
  });

  const channels = transformChannels(muttedChannels);

  const responseBuilder = new ResponseBuilder({ channels, ids });
  responseBuilder.exec(callback);
};

module.exports.set = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const muttedChnnelsIds = data.muted_channels;

  const { token } = event.requestContext.authorizer;
  const web = new WebClient(token);

  const prefs = { muted_channels: muttedChnnelsIds };



  const responseBuilder = new ResponseBuilder({ muttedChnnelsIds });
  responseBuilder.exec(callback);
};
