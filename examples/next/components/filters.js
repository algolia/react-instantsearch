import React from 'react';
import {
  RefinementList,
  connectStats,
} from 'react-instantsearch-dom';

function Filters() {
  return (
    <RefinementList attribute="categories" />
  );
}

export default connectStats(Filters);
