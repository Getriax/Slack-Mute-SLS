import { ResponseBuilder, Ramda } from '../../utils';
import { SlackDAO, HistoryDAO } from '../../DAO';

const { splitCommas } = Ramda;

export const get = async (event, context, callback) => {
  const { token } = event.requestContext.authorizer;
  const slackDao = new SlackDAO(token);

  const muted = await slackDao.getMutedChannels();
  const channels = await slackDao.getAllChannels();

  const responseBuilder = new ResponseBuilder(callback, { channels, muted });
  responseBuilder.exec();
};


export const set = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const muttedChnnelsIds = data.muted_channels;

  const { token, userId } = event.requestContext.authorizer;

  const slackDao = new SlackDAO(token);
  const historyDao = new HistoryDAO(userId);

  const responseBuilder = new ResponseBuilder(callback);
  try {
    const muted = await slackDao.setMutedChannels(muttedChnnelsIds);
    const channels = await slackDao.getAllChannels();

    const mutedArray = splitCommas(muted);

    const channelNames = mutedArray.map(id => channels[id]);

    const res = await historyDao.appendUserHistory(channelNames);

    responseBuilder.addParams(res);
    responseBuilder.exec();
  } catch (e) {
    responseBuilder.setStatus(500);
    responseBuilder.setMessage('Error while setting the muted channels');
    responseBuilder.exec();
  }
};
