import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  createConnector,
  HierarchicalMenu,
  Menu,
  Panel,
  RefinementList,
} from 'react-instantsearch-dom';
import { WrapWithHits } from './util';
import { getDisplayName } from 'react-instantsearch-core/dist/es/core/utils';

const stories = storiesOf('DynamicWidgets', module);

const connectDynamicWidgets = createConnector({
  displayName: 'AlgoliaDynamicWidgets',

  defaultProps: { transformItems: items => items },

  getProvidedProps(props, searchState, results) {
    if (!results || !results.results) {
      return { attributesToRender: [] };
    }

    // retrieve the facet order out of the results:
    // results.facetOrder.map(facet => facet.attribute)
    const facetOrder = [];

    return {
      attributesToRender: props.transformItems(facetOrder, results.results),
    };
  },
});

function getAttribute(component) {
  if (component.props.attribute) {
    return component.props.attribute;
  }
  if (Array.isArray(component.props.attributes)) {
    return component.props.attributes[0];
  }
  if (component.props.children) {
    return getAttribute(React.Children.only(component.props.children));
  }

  throw new Error(
    `attribute could not be found for ${getDisplayName(component)}`
  );
}

function RenderDynamicWidgets({ children, attributesToRender }) {
  const widgets = new Map();

  React.Children.forEach(children, child => {
    const attribute = getAttribute(child);
    widgets.set(attribute, child);
  });

  // on initial render this will be empty, but React InstantSearch keeps search state for unmounted components in place, so routing works as expected here.
  return attributesToRender.map(attribute => widgets.get(attribute));
}

const DynamicWidgets = connectDynamicWidgets(RenderDynamicWidgets);

stories.add('default', () => (
  <WrapWithHits
    initialSearchState={{ refinementList: { brand: ['Apple'] } }}
    hasPlayground={true}
    linkedStoryGroup="DynamicWidgets.stories.js"
  >
    <DynamicWidgets
      transformItems={(_attributes, results) => {
        if (results._state.query === 'dog') {
          return ['categories'];
        }
        if (results._state.query === 'lego') {
          return ['categories', 'brand'];
        }
        return ['brand', 'hierarchicalCategories.lvl0', 'categories'];
      }}
    >
      <HierarchicalMenu
        attributes={[
          'hierarchicalCategories.lvl0',
          'hierarchicalCategories.lvl1',
          'hierarchicalCategories.lvl2',
          'hierarchicalCategories.lvl3',
        ]}
      />
      <Panel>
        <RefinementList attribute="brand" />
      </Panel>
      <Menu attribute="categories" />
    </DynamicWidgets>
  </WrapWithHits>
));
