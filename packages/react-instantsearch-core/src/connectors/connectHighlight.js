import { connectHits } from 'instantsearch.js/es/connectors';

import createConnector from '../core/createConnector';

export default component => createConnector(connectHits, component);

// import React from 'react';
// import { createClassNames } from '../core/utils';
// import { HIGHLIGHT_TAGS, parseAlgoliaHit } from '../core/highlight';
// import Highlighter from './Highlighter';

// const cx = createClassNames('Highlight');

// const Highlight = props => {
//   return (
//     <Highlighter {...props} highlightProperty="_highlightResult" cx={cx} />
//   );
// };

// Highlight.mapConnectorProps = props => {
//   return {
//     ...props,
//     highlight: ({
//       attribute,
//       hit,
//       highlightProperty,
//       preTag = HIGHLIGHT_TAGS.highlightPreTag,
//       postTag = HIGHLIGHT_TAGS.highlightPostTag,
//     }) =>
//       parseAlgoliaHit({
//         attribute,
//         highlightProperty,
//         hit,
//         preTag,
//         postTag,
//       }),
//   };
// };

// export default Highlight;
