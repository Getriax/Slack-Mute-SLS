const { WebClient } = require('@slack/client');

module.exports = (token) => {
  if (token) {
    return new WebClient(token);
  }

  return new WebClient();
};
