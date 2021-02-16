import React from 'react';
import { storiesOf } from '@storybook/react';
import { SmartSort } from 'react-instantsearch-dom';
import { WrapWithHits } from './util';

const stories = storiesOf('SmartSort', module);

stories.add('default', () => (
  <WrapWithHits
    hasPlayground={true}
    appId="C7RIRJRYR9"
    apiKey="77af6d5ffb27caa5ff4937099fcb92e8"
    indexName="test_Bestbuy_vr_price_asc"
    linkedStoryGroup="SmartSort.stories.js"
  >
    <SmartSort
      textComponent={({ isSmartSorted }) => (
        <div>
          {isSmartSorted
            ? 'We are filtering unrelevant results'
            : 'We are not filtering unrelevant results'}
        </div>
      )}
      buttonTextComponent={({ isSmartSorted }) => (
        <div>{isSmartSorted ? 'See all results' : 'See relevant results'}</div>
      )}
    />
  </WrapWithHits>
));
