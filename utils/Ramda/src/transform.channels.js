import * as R from 'ramda';

const buildChannels = R.reduce((acc, channel) => {
  const { id, name } = channel;
  return Object.assign(acc, { [id]: name });
}, {});

export default buildChannels;
