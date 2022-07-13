import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Router, Route, browserHistory } from 'react-router';
import 'instantsearch.css/themes/algolia.css';

createRoot(document.getElementById('root')).render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>
);
