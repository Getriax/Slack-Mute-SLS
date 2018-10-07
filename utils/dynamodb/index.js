/* eslint-disable import/no-extraneous-dependencies */
const AWS = require('aws-sdk');

let options = {};

const isOffline = () => process.env.NODE_ENV === 'development';

if (isOffline()) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

console.log({ options });
const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = client;
