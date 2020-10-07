import React from 'react';
import { storiesOf } from '@storybook/react';
import { useSearch } from 'react-instantsearch-dom';
import { WrapWithHits } from './util';

const stories = storiesOf('Hooks', module);

function HookPlayground() {
  const { getResults, setQuery } = useSearch();

  return (
    <div>
      <button type="button" onClick={() => setQuery('Amazon')}>
        Search for 'Amazon'
      </button>
      <pre>{JSON.stringify(getResults(), null, 2)}</pre>
    </div>
  );
}

stories.add('default', function() {
  return (
    <WrapWithHits linkedStoryGroup="Hits.stories.js">
      <HookPlayground />
    </WrapWithHits>
  );
});
