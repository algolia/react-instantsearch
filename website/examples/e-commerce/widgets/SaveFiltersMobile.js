import React from 'react';
import { connectStats } from 'react-instantsearch-dom';

const SaveFiltersMobile = ({ nbHits, onClick }) => (
  <button className="button button-primary" onClick={onClick}>
    See {nbHits} results
  </button>
);

export default connectStats(SaveFiltersMobile);
