import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App-Multi-Index';
import Mentions from './App-Mentions';

createRoot(document.getElementById('autocomplete-with-multi-indices')).render(
  <App />
);

createRoot(document.getElementById('autocomplete-mentions')).render(
  <Mentions />
);
