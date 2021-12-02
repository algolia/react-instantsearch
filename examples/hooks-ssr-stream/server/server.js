import { join } from 'path';
import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { getServerState } from 'react-instantsearch-hooks-server';

import App from '../src/App';

// How long the server waits for data before giving up.
const ABORT_DELAY = 10000;

const app = express();

app.use('/assets', express.static(join(__dirname, 'assets')));

app.get(
  '/',
  handleErrors(async function (req, res) {
    const location = new URL(
      `${req.protocol}://${req.get('host')}${req.originalUrl}`
    );
    const serverState = await getServerState(<App location={location} />);

    res.socket.on('error', (error) => {
      // eslint-disable-next-line no-console
      console.error('Fatal', error);
    });

    let didError = false;
    const { pipe, abort } = renderToPipeableStream(
      <App serverState={serverState} location={location} />,
      {
        bootstrapScripts: ['/assets/bundle.js'],
        onCompleteShell() {
          // If something errored before we started streaming, we set the error code appropriately.
          res.statusCode = didError ? 500 : 200;
          res.setHeader('Content-type', 'text/html');
          pipe(res);
        },
        onError(error) {
          didError = true;
          // eslint-disable-next-line no-console
          console.error(error);
        },
      }
    );

    // Abandon and switch to client rendering if enough time passes.
    setTimeout(abort, ABORT_DELAY);
  })
);

app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on: http://localhost:8080');
});

function handleErrors(fn) {
  return async function (req, res, next) {
    try {
      return await fn(req, res);
    } catch (x) {
      next(x);
    }
  };
}
