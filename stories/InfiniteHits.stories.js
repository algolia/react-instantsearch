import React from 'react';
import PropTypes from 'prop-types';
import { setAddon, storiesOf } from '@storybook/react';
import {
  InfiniteHits,
  Highlight,
  Snippet,
} from '../packages/react-instantsearch/dom';
import { displayName, filterProps, WrapWithHits } from './util';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('InfiniteHits', module);

stories
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits linkedStoryGroup="InfiniteHits" pagination={false}>
        <InfiniteHits />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with header and footer',
    () => (
      <WrapWithHits linkedStoryGroup="InfiniteHits" pagination={false}>
        <InfiniteHits header="Infinite hits" footer="Footer" />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .add('with custom rendering', () => (
    <WrapWithHits linkedStoryGroup="InfiniteHits">
      <InfiniteHits hitComponent={Product} />
    </WrapWithHits>
  ));

function Product({ hit }) {
  return (
    <div>
      <Highlight attributeName="name" hit={hit} />
      <p>
        <Highlight attributeName="type" hit={hit} />
      </p>
      <p>
        <Snippet attributeName="description" hit={hit} />
      </p>
    </div>
  );
}

Product.propTypes = {
  hit: PropTypes.object.isRequired,
};
