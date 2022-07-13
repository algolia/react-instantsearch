import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'instantsearch.css/themes/algolia.css';
import './style.css';

createRoot(document.getElementById('root')).render(<App />);
