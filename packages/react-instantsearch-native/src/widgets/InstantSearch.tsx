import { InstantSearch as CreateInstantSearch } from 'react-instantsearch-core';

// @TODO: add React Native version as a user agent
// @TODO: import & export prop type
const InstantSearch: React.FC<any> = props => (
  <CreateInstantSearch {...props}>{props.children}</CreateInstantSearch>
);

export default InstantSearch;
