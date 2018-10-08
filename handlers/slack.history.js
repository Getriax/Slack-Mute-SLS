const { HistoryDAO } = require('../DAO');
const { ResponseBuilder } = require('../utils');

module.exports.get = async (event, context, callback) => {
  const { userId } = event.requestContext.authorizer;
  const historyDao = new HistoryDAO(userId);

  const responseBuilder = new ResponseBuilder(callback);

  try {
    const history = await historyDao.getHisotry();

    responseBuilder.addParams({ history });
  } catch (e) {
    responseBuilder.setStatus(500);
    responseBuilder.setMessage('Could not get');
  }

  responseBuilder.exec();
};

module.exports.delete = async (event, context, callback) => {
  const { userId } = event.requestContext.authorizer;
  const { deleteIndex } = JSON.parse(event.body);

  const historyDao = new HistoryDAO(userId);
  const responseBuilder = new ResponseBuilder(callback);

  try {
    const res = await historyDao.removeFromHistory(deleteIndex);
    responseBuilder.addParams(res);
  } catch (e) {
    responseBuilder.setStatus(500);
    responseBuilder.setMessage('Could not get');
  }

  responseBuilder.exec();
};
