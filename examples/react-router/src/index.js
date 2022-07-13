import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'instantsearch.css/themes/algolia.css';

createRoot(document.getElementById('root')).render(
  <Router>
    <Route path="/" component={App} />
  </Router>
);
