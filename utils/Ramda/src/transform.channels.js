const R = require('ramda');

const buildChannels = R.reduce((acc, channel) => {
  const { id, name } = channel;
  return Object.assign(acc, { [id]: name });
}, {});

module.exports = buildChannels;
