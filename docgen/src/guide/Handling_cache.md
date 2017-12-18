---
title: Handling cache
mainTitle: Guides
layout: main.pug
category: guide
navWeight: 15
---


By default, Algolia caches the search results of the queries, storing them locally in the cache. If the user ends up entering a search (or part of it) that has already been entered previously, the results will be retrieved from the cache, instead of requesting them from Algolia, making the application much faster.

While it is a very convenient feature, in some cases, it is useful to have the ability to clear the cache and make a new request to Algolia. For instance, when changes are made on some records on your index, you might want the frontend side of your application to be updated to reflect that change (in order to avoid displaying stale results retrieved from the cache).

To do so, there is a prop on the `<InstantSearch>` component called `refresh` that, when set to true, clears the cache and triggers a new search.

There are two different approaches to handle the cache:
 - have the refresh of the cache triggered by an action from the user 
 - refresh the cache periodically
 
 ## Have the refresh of the cache triggered by an action from the user
If you know that the cache needs to be refreshed conditionally of a specific event, then you can trigger the refresh based on an user action (adding a new product, clicking on a button for instance).

```jsx
import React, { Component } from 'react';
import { InstantSearch, SearchBox } from '../packages/react-instantsearch/dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    };
  }

  refresh = () => {
    this.setState(prevState => ({
      refresh: !prevState.refresh,
    }));
  };

  onSearchStateChange = () => {
    this.setState({ refresh: false });
  };

  render() {
    return (
      <InstantSearch
        appId="yourAppId"
        apiKey="yourApiKey"
        indexName="yourIndexName"
        refresh={this.state.refresh}
        onSearchStateChange={this.onSearchStateChange}
      >
        <SearchBox />
        <button
          onClick={this.refresh}
        >
          Refresh cache
        </button>
        <CustomHits />
      </InstantSearch>
    );
  }
}
```

See the example in this [story](https://community.algolia.com/react-instantsearch/storybook/?selectedKind=RefreshCache&selectedStory=with%20a%20refresh%20button&full=0&down=1&left=1&panelRight=1&downPanel=storybooks%2Fstorybook-addon-knobs). 

 ## Refresh the cache periodically
You also have the option to setup an given period of time that will determine how often the cache will be cleared. 
This method will ensure that the cache is cleared on a regular basis.
You should use this approach if you cannot use a user action as a specific event to trigger the clearing of the cache.

```jsx
import React, { Component } from 'react';
import { InstantSearch, SearchBox } from '../packages/react-instantsearch/dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    };
  }

  componentDidMount = () => {
    setInterval(
      () =>
        this.setState({ refresh: true }, () =>
          this.setState({ refresh: false })
        ),
      5000
    );
  };

  render() {
    return (
      <InstantSearch
        appId="yourAppId"
        apiKey="yourApiKey"
        indexName="yourIndexName"
        refresh={this.state.refresh}
        onSearchStateChange={this.onSearchStateChange}
      >
        <SearchBox />
        <CustomHits />
      </InstantSearch>
    );
  }
}
```

See the example in this [story](https://community.algolia.com/react-instantsearch/storybook/?selectedKind=RefreshCache&selectedStory=with%20setInterval&full=0&down=1&left=1&panelRight=1&downPanel=storybooks%2Fstorybook-addon-knobs).