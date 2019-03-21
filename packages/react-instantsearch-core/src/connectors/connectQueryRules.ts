import createConnector from '../core/createConnector';
import { getResults } from '../core/indexUtils';

export type CustomUserData = {
  [key: string]: any;
};

type QueryRulesProps<TItem = CustomUserData> = {
  transformItems: (items: TItem[]) => TItem[];
};

export default createConnector({
  displayName: 'AlgoliaQueryRules',

  defaultProps: {
    transformItems: items => items,
  } as QueryRulesProps,

  getProvidedProps(
    props: QueryRulesProps,
    _searchState: any,
    searchResults: any
  ) {
    const results = getResults(searchResults, this.context);

    if (results === null) {
      return {
        items: [],
        canRefine: false,
      };
    }

    const { userData = [] } = results;
    const { transformItems } = props;
    const transformedItems = transformItems
      ? transformItems(userData)
      : userData;

    return {
      items: transformedItems,
      canRefine: transformedItems.length > 0,
    };
  },
});
