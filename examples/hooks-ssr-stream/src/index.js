import React from 'react';
import { hydrateRoot } from 'react-dom';
import App from './App';

const SERVER_STATE = window.__SERVER_STATE__;

delete window.__SERVER_STATE__;

hydrateRoot(document, <App serverState={SERVER_STATE} />);
