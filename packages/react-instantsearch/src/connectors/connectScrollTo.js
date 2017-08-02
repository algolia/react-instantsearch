import PropTypes from 'prop-types';

import createConnector from '../core/createConnector';
import {
  getCurrentRefinementValue,
  hasMultipleIndex,
  getIndex,
} from '../core/indexUtils';
import { shallowEqual } from '../core/utils';
import { omit } from 'lodash';
/**
 * connectScrollTo connector provides the logic to build a widget that will
 * let the page scroll to a certain point.
 * @name connectScrollTo
 * @kind connector
 * @propType {string} [scrollOn="page"] - Widget searchState key on which to listen for changes, default to the pagination widget.
 * @providedPropType {any} value - the current refinement applied to the widget listened by scrollTo
 * @providedPropType {boolean} hasNotChanged - indicate if the refinement came from the scrollOn observed widget
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

    if (!this._prevSearchState) {
      this._prevSearchState = {};
    }

    /* Get the subpart of the state that interest us*/
    if (hasMultipleIndex(this.context)) {
      const index = getIndex(this.context);
      searchState = searchState.indices ? searchState.indices[index] : {};
    }

    /*
      We need to keep track of the search state to know if there's a change in the app
      that was not triggered by the props.scrollOn (id) or the Configure widget. 
      This is useful when using ScrollTo in combination of Pagination. As pagination
      can be change by every widget, we want to scroll only if it cames from the pagination
      widget itself. We also remove the configure key to do this comparaison because for 
      now configure values are not present in the search state before a first refinements and will false 
      the results. 
      See: https://github.com/algolia/react-instantsearch/issues/164
    */
    const cleanedSearchState = omit(omit(searchState, 'configure'), id);

    const hasNotChanged = shallowEqual(
      this._prevSearchState,
      cleanedSearchState
    );

    this._prevSearchState = cleanedSearchState;

    return { value, hasNotChanged };
  },
});
