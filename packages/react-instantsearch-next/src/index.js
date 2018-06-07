// Core
export { default as createWidget } from './core/createWidget';

// Widget
export { default as InstantSearch } from './core/InstantSearch';

// Renderer
export { ConfigureRenderer } from './Configure';
export { HitsRenderer } from './Hits';
export { RefinementListRenderer } from './RefinementList';
export { SearchBoxRenderer } from './SearchBox';

// DOM
export { ConfigureWidget as Configure } from './Configure';
export { HitsWidget as Hits } from './Hits';
export { RefinementListWidget as RefinementList } from './RefinementList';
export { SearchBoxWidget as SearchBox } from './SearchBox';

// Not implemented correctly
export { default as Highlight } from './Highlight';
