const { dynamodb } = require('../../utils');

class HistoryDAO {
  constructor(uid) {
    this.uid = uid;
  }

  async appendUserHistory(muted) {
    const ts = Date.now();
    const value = { muted, ts };

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        uid: this.uid,
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

    const { Attributes } = await dynamodb.update(params).promise();

    if (Attributes && Attributes.history) {
      return { updated: Attributes.history };
    }

    return { message: 'Could not save in hisotry' };
  }

  async getHisotry() {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        uid: this.uid,
      },
    };

    const { Item } = await dynamodb.get(params).promise();
    const { history } = Item;

    return history;
  }

  async removeFromHistory(index) {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        uid: this.uid,
      },
      UpdateExpression: `REMOVE history[${index}]`,
      ReturnValues: 'UPDATED_OLD',
    };

    const { Attributes } = await dynamodb.update(params).promise();

    if (Attributes && Attributes.history) {
      return { removed: Attributes.history[index], index };
    }

    return { removed: [] };
  }

  async createUserIfNotExists() {
    const TableName = process.env.DYNAMODB_TABLE;

    try {
      const response = await dynamodb.get({
        TableName,
        Key: {
          uid: this.uid,
        },
      }).promise();

      if (!response || !response.Item) {
        const created = Date.now();

        await dynamodb.put({
          TableName,
          Item: {
            uid: this.uid,
            created,
            history: [],
          },
        }).promise();
      }
    } catch (e) {
      throw new Error('Database problem');
    }
  }
}

module.exports = HistoryDAO;
