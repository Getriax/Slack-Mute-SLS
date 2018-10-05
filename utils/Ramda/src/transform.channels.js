const R = require('ramda');

const defined = R.filter(data => data);

const buildChannels = R.map(({ channel }) => {
  const { id, name } = channel;
  return { [id]: name };
});

module.exports = R.pipe(defined, buildChannels);
