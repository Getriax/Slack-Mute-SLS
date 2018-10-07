const { dynamodb, ResponseBuilder } = require('../utils');

module.exports.get = async (event, context, callback) => {
  const { userId } = event.requestContext.authorizer;

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      uid: userId,
    },
  };

  const responseBuilder = new ResponseBuilder(callback);

  try {
    const { Item } = await dynamodb.get(params).promise();

    const { history } = Item;
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

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      uid: userId,
    },
    UpdateExpression: `REMOVE history[${deleteIndex}]`,
    ReturnValues: 'UPDATED_OLD',
  };

  const responseBuilder = new ResponseBuilder(callback);

  try {
    const { Attributes } = await dynamodb.update(params).promise();

    if (Attributes && Attributes.history) {
      responseBuilder.addParams({ removed: Attributes.history[deleteIndex], deleteIndex });
    } else {
      responseBuilder.addParams({ removed: false });
    }
  } catch (e) {
    responseBuilder.setStatus(500);
    responseBuilder.setMessage('Could not get');
  }

  responseBuilder.exec();
};
