import React from 'react';
import { connectStats } from 'react-instantsearch-dom';

const ResultsNumberMobile = ({ nbHits }) => (
  <div>
    <strong>{nbHits}</strong> results
  </div>
);

export default connectStats(ResultsNumberMobile);
