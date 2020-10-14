/* eslint-disable import/no-commonjs */
const { createMetroConfiguration } = require('expo-yarn-workspaces');
const blacklist = require('metro-config/src/defaults/blacklist');

const config = createMetroConfiguration(__dirname);
module.exports = {
  ...config,
  resolver: {
    ...config.resolver,
    blacklistRE: blacklist([
      /.*\/android\/React(Android|Common)\/.*/,
      /.*\/versioned-react-native\/.*/,
      /dist\/.*/,
    ]),
  },
};
