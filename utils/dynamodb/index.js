/* eslint-disable import/no-extraneous-dependencies */
import * as AWS from 'aws-sdk';

let options = { region: process.env.REGION };

const isOffline = () => /development|test/.exec(process.env.NODE_ENV);

if (isOffline()) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

const client = new AWS.DynamoDB.DocumentClient(options);

export default client;
