import React from 'react';
import PropTypes from 'prop-types';
import { Mentions } from 'antd';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectAutoComplete } from 'react-instantsearch-dom';

import 'antd/dist/antd.css';

const { Option } = Mentions;

const AsyncMention = ({ hits, refine }) => (
  <Mentions
    style={{ width: 600 }}
    rows={4}
    prefix="@"
    notFoundContent="No suggestion"
    placeholder="give someone an @-mention here"
    onSearch={(query) => refine(query)}
  >
    {hits.map((hit, index) => {
      return (
        <Option key={index} value={hit.name}>
          {hit.name}
        </Option>
      );
    })}
  </Mentions>
);

AsyncMention.propTypes = {
  hits: PropTypes.array,
  refine: PropTypes.func,
};

const ConnectedAsyncMention = connectAutoComplete(AsyncMention);

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const App = () => (
  <InstantSearch searchClient={searchClient} indexName="actors">
    <ConnectedAsyncMention />
  </InstantSearch>
);

export default App;
