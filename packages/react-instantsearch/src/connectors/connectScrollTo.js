import PropTypes from 'prop-types';

import createConnector from '../core/createConnector';
import { getCurrentRefinementValue, cleanUpValue } from '../core/indexUtils';
import { isEqual } from 'lodash';
/**
 * connectScrollTo connector provides the logic to build a widget that will
 * let the page scroll to a certain point.
 * @name connectScrollTo
 * @kind connector
 * @propType {string} [scrollOn="page"] - Widget searchState key on which to listen for changes, default to the pagination widget.
 * @providedPropType {any} value - the current refinement applied to the widget listened by scrollTo
 */
export default createConnector({
  displayName: 'AlgoliaScrollTo',

  propTypes: {
    scrollOn: PropTypes.string,
  },

  defaultProps: {
    scrollOn: 'page',
  },

  getProvidedProps(props, searchState) {
    const id = props.scrollOn;
    const value = getCurrentRefinementValue(
      props,
      searchState,
      this.context,
      id,
      null,
      currentRefinement => currentRefinement
    );

    /*
      search state has changed only if the props.scrollOn (id) has changed. 
      This is useful when using ScrollTo in combination of Pagination. As pagination
      can be change by every widgetw, we want to scroll only if it cames from the pagination
      one. We also remove the configure key to do this comparaison because for now configure
      values are not present in the search state before a first refinements and will false 
      the results. 
      See: https://github.com/algolia/react-instantsearch/issues/164
    */
    const cleanSearchState = cleanUpValue(
      cleanUpValue(searchState, this.context, 'configure'),
      this.context,
      id
    );

    const hasNotChanged = isEqual(this._prevSearchState, cleanSearchState);

    this._prevSearchState = cleanSearchState;

    return { value, hasNotChanged };
  },
});
