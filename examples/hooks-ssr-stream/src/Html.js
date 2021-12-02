import React from 'react';

export function Html({ serverState, children, title }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/satellite.css"
          rel="stylesheet"
        />

        <title>{title}</title>
      </head>

      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `Enable JavaScript to run this app.`,
          }}
        />

        {children}

        <script
          dangerouslySetInnerHTML={{
            __html: `window.__SERVER_STATE__ = ${JSON.stringify(serverState)};`,
          }}
        />
      </body>
    </html>
  );
}
