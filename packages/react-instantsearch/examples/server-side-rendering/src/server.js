import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';
import template from './template';
import { findResultsState } from 'react-instantsearch/server';

const server = express();

server.use('/assets', express.static('assets'));

server.get('/', async (req, res) => {
  const resultsState = await findResultsState(App);
  const initialState = { resultsState };
  const appString = renderToString(<App {...initialState} />);

  res.send(
    template({
      body: appString,
      title: 'Hello World from the server',
      initialState: JSON.stringify(initialState),
    })
  );
});

server.listen(8080);

/* eslint-disable no-console */
console.log('listening on 8080');
/* eslint-enable no-console */
