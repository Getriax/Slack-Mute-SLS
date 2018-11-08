import { WebClient } from '@slack/client';
import { Ramda } from '../../utils';

const { splitCommas, joinCommas, transformChannels } = Ramda;

const { CLIENT_ID, CLIENT_SECRET } = process.env;

export default class SlackDAO {
  constructor(token) {
    this.client = SlackDAO.slackClient(token);
  }

  static slackClient(token) {
    if (token) {
      return new WebClient(token);
    }

    return new WebClient();
  }

  async isAuthorized() {
    try {
      const { ok } = await this.client.auth.test();
      return ok;
    } catch (e) {
      return false;
    }
  }

  async authorize(code) {
    const params = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    };

    try {
      const data = await this.client.oauth.access(params);

      const slackToken = data.access_token;
      const userId = data.user_id;

      return { slackToken, userId };
    } catch (e) {
      throw new Error('Slack access denyed');
    }
  }

  async getAllChannels(limit = 1000) {
    const { channels } = await this.client.conversations.list({
      limit,
      types: 'public_channel,private_channel',
    });

    return transformChannels(channels);
  }

  async getMutedChannels() {
    const { prefs } = await this.client.users.prefs.get();
    const muted = splitCommas(prefs.muted_channels);

    return muted;
  }

  async setMutedChannels(idsList) {
    const prefs = { muted_channels: joinCommas(idsList) };
    const response = await this.client.users.prefs.set({ prefs });

    return response.prefs.muted_channels;
  }
}
