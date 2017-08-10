var algoliaComponents = require('algolia-frontend-components');
var fs = require('fs');

import pkg from '../packages/react-instantsearch/package.json';
import { rootPath } from './path';

var content = JSON.parse(fs.readFileSync('./docgen/src/data/communityHeader.json', 'utf8').toString());
var headerAlgoliaLogo = fs.readFileSync('./docgen/assets/img/algolia-logo-whitebg.svg', 'utf8').toString();
var headerCommunityLogo = fs.readFileSync('./docgen/assets/img/algolia-community-dark.svg', 'utf8').toString();
var header = algoliaComponents.communityHeader(content, {
  algoliaLogo: headerAlgoliaLogo,
  communityLogo: headerCommunityLogo
});

const configs = {
  production: {
    docsDist: rootPath('docs-production/react-instantsearch'),
    storyBookPublicPath: 'storybook/',
    publicPath: '/react-instantsearch/',
    header: header
  },
  development: {
    docsDist: rootPath('docs/react-instantsearch'),
    storyBookPublicPath: 'http://localhost:6006/',
    publicPath: '/',
    header: header
  },
};

export default { ...configs[process.env.NODE_ENV], pkg };
