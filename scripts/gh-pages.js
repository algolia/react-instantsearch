/* eslint-disable no-console */

import ghpages from 'gh-pages';
import {join} from 'path';

ghpages.clean();

const site = join(__dirname, '../docs-production');
const logger = msg => console.log(msg);
const end = err => {
  if (err) {
    throw err;
  }

  console.log('website published');
};

const defaultOptions = {
  logger,
  silent: true,
  src: 'react/**/*', // everything in react/
  only: 'react/', // only remove what's in react/, keep other untouched (leave V1 doc)
};

// On travis
ghpages.publish(site, defaultOptions, end);
