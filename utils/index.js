const ResponseBuilder = require('./ResponseBuilder');
const buildIAMPolicy = require('./buildIAMPolicy');
const Ramda = require('./Ramda');
const dynamodb = require('./dynamodb');

module.exports = {
  ResponseBuilder,
  buildIAMPolicy,
  Ramda,
  dynamodb,
};
