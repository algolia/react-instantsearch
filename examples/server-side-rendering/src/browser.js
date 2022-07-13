import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createApp } from './createApp';

const { App, props } = createApp();

const __APP_INITIAL_STATE__ = window.__APP_INITIAL_STATE__;

delete window.__APP_INITIAL_STATE__;

hydrateRoot(
  document.getElementById('root'),
  <App {...props} {...__APP_INITIAL_STATE__} />
);
