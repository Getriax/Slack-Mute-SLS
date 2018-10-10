/* eslint-disable import/no-extraneous-dependencies */
const AWS = require('aws-sdk');

let options = { region: process.env.REGION };

const isOffline = () => /development|test/.exec(process.env.NODE_ENV);

if (isOffline()) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = client;
