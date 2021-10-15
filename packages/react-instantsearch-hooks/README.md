# react-instantsearch-hooks

> 🚧 This version is not yet production-ready.

React InstantSearch Hooks is an open-source, **experimental UI library** for React that lets you quickly build a search interface in your front-end application.

## Installation

React InstantSearch Hooks is available on the npm registry. It relies on [`algoliasearch`](https://github.com/algolia/algoliasearch-client-javascript) to communicate with Algolia APIs.

```sh
yarn add react-instantsearch-hooks algoliasearch
# or
npm install react-instantsearch-hooks algoliasearch
```

## Getting started

This packages exposes Hooks but no components (yet!). You first need to create components based on the exposed Hooks.

Let's start with a `SearchBox` component based on `useSearchBox`:

```jsx
import React, { useEffect, useRef, useState } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks';

export function SearchBox(props) {
  const { query, refine, isSearchStalled } = useSearchBox(props);
  const [value, setValue] = useState(query);
  const inputRef = useRef(null);

  function onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    if (inputRef.current) {
      inputRef.current.blur();
    }
  }

  function onReset(event) {
    event.preventDefault();
    event.stopPropagation();

    setValue('');

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function onChange(event) {
    setValue(event.currentTarget.value);
  }

  useEffect(() => {
    refine(value);
  }, [refine, value]);

  useEffect(() => {
    if (query !== value) {
      setValue(query);
    }
  }, [query]);

  return (
    <div className="ais-SearchBox">
      <form
      action="
        className="ais-SearchBox-form"
        noValidate
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <input
          ref={inputRef}
          className="ais-SearchBox-input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={props.placeholder}
          spellCheck={false}
          maxLength={512}
          type="search"
          value={value}
          onChange={onChange}
        />

        <button
          className="ais-SearchBox-submit"
          type="submit"
          title="Submit the search query."
        >
          <svg
            className="ais-SearchBox-submitIcon"
            width="10"
            height="10"
            viewBox="0 0 40 40"
          >
            <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
          </svg>
        </button>

        <button
          className="ais-SearchBox-reset"
          type="reset"
          title="Clear the search query."
          hidden={value.length === 0 && !isSearchStalled}
        >
          <svg
            className="ais-SearchBox-resetIcon"
            viewBox="0 0 20 20"
            width="10"
            height="10"
          >
            <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
}
```

Then, you can create a `Hits` component with `useHits`:

```jsx
import React from 'react';
import { useHits } from 'react-instantsearch-hooks';

export function Hits({ hitComponent: Hit, ...props }) {
  const { hits } = useHits(props);

  return (
    <div className="ais-Hits">
      <ol className="ais-Hits-list">
        {hits.map((hit) => (
          <li key={hit.objectID} className="ais-Hits-item">
            <Hit hit={hit} />
          </li>
        ))}
      </ol>
    </div>
  );
}
```

You can now use these components in the `InstantSearch` provider:

```javascript
import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, useConnector } from 'react-instantsearch-hooks';

import { SearchBox } from './SearchBox';
import { Hits } from './Hits';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

function App() {
  return (
    <InstantSearch indexName="instant_search" searchClient={searchClient}>
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
}
```

<p align="center">
  <a href="https://codesandbox.io/s/github/algolia/react-instantsearch/tree/master/examples/hooks" title="Edit on CodeSandbox">
    <img alt="Edit on CodeSandbox" src="https://codesandbox.io/static/img/play-codesandbox.svg">
  </a>
</p>

You can use any [InstantSearch.js connector](https://www.algolia.com/doc/api-reference/widgets/js/) with the [`useConnector`](#useconnector) function.

## API

### `InstantSearch`

The root provider component of all React InstantSearch hooks.

```jsx
import { InstantSearch } from 'react-instantsearch-hooks';
```

It accepts all [props from the InstantSearch.js `instantsearch` widget](https://www.algolia.com/doc/api-reference/widgets/instantsearch/js/#options).

#### `indexName`

> `string` | **required**

The main index to search into.

```jsx
<InstantSearch
  // ...
  indexName="instant_search"
>
  {/* Widgets */}
</InstantSearch>
```

#### `searchClient`

> `object` | **required**

Provides a search client to `InstantSearch`.

```jsx
const searchClient = algoliasearch(
  'RPF6V4143M',
  '3b24c36fac8bb7c1ee0cce05474849cc'
);

<InstantSearch
  // ...
  searchClient={searchClient}
>
  {/* Widgets */}
</InstantSearch>;
```

### `initialUiState`

> `object`

Adds a [uiState](https://www.algolia.com/doc/api-reference/widgets/ui-state/js/) to InstantSearch, which provides an initial state to your widgets. To apply the `uiState` to the search parameters, you must add the corresponding widgets to InstantSearch.

```jsx
<InstantSearch
  // ...
  initialUiState={{
    indexName: {
      query: 'phone',
      page: 5,
    },
  }}
>
  {/* Widgets */}
</InstantSearch>
```

### `onStateChange`

> `function`

Triggers when the state changes.

By using option, the instance becomes controlled. This means that **you become responsible for updating the UI state** with `setUiState`.

This can be useful to perform custom logic whenever the state changes.

```jsx
<InstantSearch
  // ...
  onStateChange={({ uiState, setUiState }) => {
    // Custom logic

    setUiState(uiState);
  }}
>
  {/* Widgets */}
</InstantSearch>
```

### `stalledSearchDelay`

> `number` | defaults to `200`

Defines a time period after which a search is considered stalled. You can find more information in the [slow network guide](https://www.algolia.com/doc/guides/building-search-ui/going-further/improve-performance/js/#mitigate-the-impact-of-slow-network-in-your-search-application).

```jsx
<InstantSearch
  // ...
  stalledSearchDelay={500}
>
  {/* Widgets */}
</InstantSearch>
```

### `routing`

> `boolean | object`

The router configuration used to save the UI state into the URL, or any client-side persistence. You can find more information in the [routing guide](https://www.algolia.com/doc/guides/building-search-ui/going-further/routing-urls/js/).

```jsx
<InstantSearch
  // ...
  routing={true}
>
  {/* Widgets */}
</InstantSearch>
```

### `suppressExperimentalWarning`

> `boolean`

Removes the console warning about the experimental version. Note that this warning is only displayed in development mode.

```jsx
<InstantSearch
  // ...
  suppressExperimentalWarning={true}
>
  {/* Widgets */}
</InstantSearch>
```

### `Index`

The provider component for an Algolia index. It's useful when you want to build a federated search interface.

It accepts all [props from the InstantSearch.js `index` widget](https://www.algolia.com/doc/api-reference/widgets/index-widget/js/#options).

#### `indexName`

> `string` | **required**

The index to search into.

```jsx
<Index indexName="instant_search">{/* Widgets */}</Index>
```

#### `indexId`

> `string`

An identifier for the `Index` widget. Providing an `indexId` allows different index widgets to target the same Algolia index. It’s especially useful for the [routing](#routing) feature. It lets you find the refinements that match an `index` widget.

```jsx
<Index
  // ...
  indexId="instant_search"
>
  {/* Widgets */}
</Index>
```

### `useConnector`

React Hook to plug an InstantSearch.js connector to React InstantSearch.

Here's an example to use [`connectMenu`](https://www.algolia.com/doc/api-reference/widgets/menu/js/#connector):

```jsx
import connectMenu from 'instantsearch.js/es/connectors/menu/connectMenu';
import { useConnector } from 'react-instantsearch-hooks';

function useMenu(props) {
  return useConnector(connectMenu, props);
}
```
