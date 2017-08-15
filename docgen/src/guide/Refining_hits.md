---
title: Refining within hits
mainTitle: Guides
layout: main.pug
category: guide
navWeight: # idk what to put here 🚨
---

## Introduction

In some interfaces, you want to have buttons _inside_ your Hits that will change the refinement of the current search, rather than as standalone components. Since we can't replicate this pattern with widgets, we will need to go with Refinementlists that don't render anything. Please note that this is an advanced tutorial and requires moderate knowledge of how React and React InstantSearch work. Our final result will look something like this, let's get started!

<iframe src="https://codesandbox.io/embed/oY1klpZYB" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Regular setup

First, we'll set up a regular project with create-react-app and react-instantsearch.

```sh
$ yarn create react-app refining-hits # or npm install -g create-react-app && create-react-app refining-hits
$ cd refining-hits
$ yarn add react-instantsearch # or npm install --save react-instantsearch
```

The index that we will use in this example needs to be set up with: 

```jsx
index.setSettings({
  attributesForFaceting: ['searchable(keywords)', 'searchable(owner.name)'],
});
```

In this guide we will use the search index we use on the [Yarn](https://yarn.fyi) website. It already has the mandatory `attributesForFaceting ` configured.
We will get started in `App.js` and set up a regular React InstantSearch app:

```jsx
import React, { Component } from 'react';
import {
  Configure,
  InstantSearch,
  SearchBox,
  Hits,
} from 'react-instantsearch/dom';

class App extends Component {
  render() {
    return (
      <InstantSearch
        appId="OFCNCOG2CU"
        apiKey="f54e21fa3a2a0160595bb058179bfb1e"
        indexName="npm-search"
      >
        <SearchBox />
        <CurrentRefinements />
        <Hits />
        <Configure
          attributesToRetrieve={[
            'name',
            'description',
            'keywords',
            'owner.name',
          ]}
        />
      </InstantSearch>
    );
  }
}

export default App;
```

We will also set up a separate file called `Hit.js` for the component that renders the hits: 

```jsx
import React from 'react';

const Tags = ({ keywords = [] }) =>
  <div>
    {keywords.map((keyword, i) =>
      <span key={keyword}>
        {i > 0 && ', '}
        <button>
          {keyword}
        </button>
      </span>
    )}
  </div>;

const Hit = ({ hit: { name, description, keywords, owner } }) =>
  <article>
    <h1>
      <a
        href={`https://yarn.fyi/${name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
    </h1>
    <p>
      {description}
    </p>
    <p>
      by{' '}
      <button>
        {owner.name}
      </button>
    </p>
    <Tags keywords={keywords} />
  </article>;

export default Hit;
```

In this component we took the name, description and owner of a certain package, and render these as hits. To enable this as `hitComponent`, we will change the line in `App.js` that renders the `Hit` component:

```jsx
import React, { Component } from 'react';
import {
  Configure,
  InstantSearch,
  SearchBox,
  Hits,
} from 'react-instantsearch/dom';
import Hit from './Hit'

class App extends Component {
  render() {
    return (
      <InstantSearch
        appId="OFCNCOG2CU"
        apiKey="f54e21fa3a2a0160595bb058179bfb1e"
        indexName="npm-search"
      >
        <SearchBox />
        <CurrentRefinements />
        <Hits hitComponent={({hit}) => <Hit hit={hit} />}/>
        <Configure
          attributesToRetrieve={[
            'name',
            'description',
            'keywords',
            'owner.name',
          ]}
        />
      </InstantSearch>
    );
  }
}

export default App;
```

We manually render the `hitComponent` as a function, because we want to add extra functions to the `Hit` component later. Now we will also set up two `RefinementList`s for `keywords` and `owner.name`. We do this in a container so that the difference is clear, but you can change the rendering of this however you prefer:

```jsx
import {
  Configure,
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList
} from 'react-instantsearch/dom';
import Hit from './Hit';

class App extends Component {
  render() {
    return (
      <InstantSearch
        appId="OFCNCOG2CU"
        apiKey="f54e21fa3a2a0160595bb058179bfb1e"
        indexName="npm-search"
      >
        <SearchBox />
        <div style={{ display: 'flex', border: '1px solid black' }}>
          <RefinementList attributeName="keywords" withSearchBox />
          <RefinementList attributeName="owner.name" withSearchBox />
        </div>
        <Hits hitComponent={({hit}) => <Hit hit={hit} />}/>
        <Configure
          attributesToRetrieve={[
            'name',
            'description',
            'keywords',
            'owner.name',
          ]}
        />
      </InstantSearch>
    );
  }
}

export default App;
```

If we look at what we have now, then we see that we can select any keyword, or any owner as expected, with buttons that don't do anything yet.

<iframe src="https://codesandbox.io/embed/0gJW06BAX" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Adding virtual RefinementLists

A "virtual" RefinementList is a RefinementList, just like the ones that are using the regular widgets, but with the exception that they won't render anything. We will make a virtual RefinementList here that will take `defaultRefinement` into account when rendering. We will make a `VirtualRefinementList` component, which uses a `connectRefinementList`: 

```jsx
import { connectRefinementList } from 'react-instantsearch/connectors';
```

We will make a Component that renders nothing, and that's what we export from the `VirtualRefinementList.js` file:

```jsx
class RefinementList extends Component {
  render() {
    return null;
  }
}

const VirtualRefinementList = connectRefinementList(RefinementList);
export default VirtualRefinementList;
```

Now this seems pretty useless, except that this component will get the correct props from its connector, each time something in its props change. The props we get from this connector are: `currentRefinement` and `defaultRefinement`. `defaultRefinement` is what we will manually set from within our Hit, `currentRefinement` is the current state of the search, relevant to that refinement, but maybe we should first implement it in our `App.js`: 

```jsx
import {
  Configure,
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList
} from 'react-instantsearch/dom';
import Hit from './Hit';
import VirtualRefinementList from './VirtualRefinementList';

class App extends Component {
  state = {
    refinements: {
      keywords: [],
      'owner.name': [],
    }
  }

  render() {
    return (
      <InstantSearch
        appId="OFCNCOG2CU"
        apiKey="f54e21fa3a2a0160595bb058179bfb1e"
        indexName="npm-search"
      >
        <SearchBox />
        <div style={{ display: 'flex', border: '1px solid black' }}>
          <RefinementList attributeName="keywords" withSearchBox />
          <RefinementList attributeName="owner.name" withSearchBox />
        </div>
        <VirtualRefinementList
          attributeName="keywords"
          defaultRefinement={[...this.state.refinements.keywords]}
        />
        <VirtualRefinementList
          attributeName="owner.name"
          defaultRefinement={[...this.state.refinements['owner.name']]}
        />
        <Hits hitComponent={({hit}) => <Hit hit={hit} />}/>
        <Configure
          attributesToRetrieve={[
            'name',
            'description',
            'keywords',
            'owner.name',
          ]}
        />
      </InstantSearch>
    );
  }
}

export default App;
```

We will change the state of `App` from within the `Hit` component later so that it will update the `defaultRefinement` of each respective `VirtualRefinementList`. We want to use this new data with our connector every time it changes, so let's add a lifecycle hook in `VirtualRefinementList`:

```jsx
const equals = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.reduce((a, b, i) => a && arr2[i], true);

class RefinementList extends Component {
  componentWillReceiveProps(newProps) {
    const { currentRefinement, defaultRefinement, onRefine, refine } = newProps;
    const {
      currentRefinement: oldCurrentRefinement,
      defaultRefinement: oldDefaultRefinement,
      attributeName,
    } = this.props;

    if (!equals(currentRefinement, oldCurrentRefinement)) {
      refine(currentRefinement);
      onRefine({ attributeName, value: currentRefinement });
    }

    if (!equals(defaultRefinement, oldDefaultRefinement)) {
      refine(defaultRefinement);
      onRefine({ attributeName, value: defaultRefinement });
    }
  }

  render() {
    return null;
  }
}
```

We compare the current refinement with the previous current refinement. If they aren't the same, then we will call the  `onRefine` callback from our props with the current `attributeName` and with the new value. We do the same for the `defaultRefinement` so that the correct refinement is always chosen.

We made this callback, but now we also need to do something with it in `App.js`: 

```jsx
class App extends Component {
  state = {
    refinements: {
      keywords: [],
      'owner.name': [],
    }
  }

  onRefine = ({ attributeName, value }) =>
    this.setState(state => ({
      ...state,
      refinements: {
        ...state.refinements,
        [attributeName]: [...value],
      },
    }));

  render() {
    return (
      <InstantSearch
        appId="OFCNCOG2CU"
        apiKey="f54e21fa3a2a0160595bb058179bfb1e"
        indexName="npm-search"
      >
        <VirtualRefinementList
          attributeName="keywords"
          defaultRefinement={[...this.state.refinements.keywords]}
          onRefine={this.onRefine}
        />
        <VirtualRefinementList
          attributeName="owner.name"
          defaultRefinement={[...this.state.refinements['owner.name']]}
          onRefine={this.onRefine}
        />
        {/* the rest of our interface */}
      </InstantSearch>
    );
  }
}
```

This function will take the value that our refinementList says is relevant for that refinement, and put it in the current state of our App. Now we have communication in both directions between the search state and with the state of our hits. Next up: adding new refinements.

## Refining from within hits

To be able to refine from a hit, we need to change the state in `App`. We add a function to this class to do that cleanly: 

```jsx
class App extends Component {
  refine = ({ attributeName, value }) => {
    this.setState(state => {
      const index = state.refinements[attributeName].indexOf(value);

      if (index === -1) {
        const oldValue = state.refinements[attributeName];
        return {
          ...state,
          refinements: {
            ...state.refinements,
            [attributeName]: [...oldValue, value],
          },
        };
      }

      const newValue = state.refinements[attributeName].slice();
      newValue.splice(index, 1);
      return {
        ...state,
        refinements: {
          ...state.refinements,
          [attributeName]: newValue,
        },
      };
    });
  };
}
```

This function works as follows: it has an `attributeName` and a `value`, the value is what we want to add to the `VirtualRefinementList`, a string, for example `nodejs` or `react`. We will first check if our array for this attribute already contains that value. If it doesn't contain it, we simply add it to the array, if the array already contains the value we want, we remove it. Finally this value is set as the new state. Correspondingly, that change in state will trigger a change in `defaultRefinement` of the `VirtualRefinementList` for that attribute, and update the search interface. 

But we still need to call this function. What we do is add `this.refine` as a prop to the `Hit` component, and call it there when needed. The implementation of the `Hit` component now looks like this: 

```jsx
import React from 'react';

const Tags = ({ keywords = [], onClick }) =>
  <div>
    {keywords.map((keyword, i) =>
      <span key={keyword}>
        {i > 0 && ', '}
        <button
          onClick={() => onClick({ attributeName: 'keywords', value: keyword })}
        >
          {keyword}
        </button>
      </span>
    )}
  </div>;

const Hit = ({ hit: { name, description, keywords, owner }, refine }) =>
  <article>
    <h1>
      <a
        href={`https://yarn.fyi/${name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
    </h1>
    <p>
      {description}
    </p>
    <p>
      by{' '}
      <button
        onClick={() =>
          refine({
            attributeName: 'owner.name',
            value: owner.name,
          })}
      >
        {owner.name}
      </button>
    </p>
    <Tags keywords={keywords} onClick={refine} />
  </article>;

export default Hit;
```

Our final `App.js` looks like this: 

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  Configure,
  InstantSearch,
  SearchBox,
  Hits,
  CurrentRefinements,
  RefinementList,
} from 'react-instantsearch/dom';

import Hit from './Hit';
import VirtualRefinementList from './VirtualRefinementList';

export default class Search extends Component {
  state = {
    refinements: {
      keywords: [],
      'owner.name': [],
    },
  };

  refine = ({ attributeName, value }) => {
    this.setState(state => {
      const index = state.refinements[attributeName].indexOf(value);

      if (index === -1) {
        const oldValue = state.refinements[attributeName];
        return {
          ...state,
          refinements: {
            ...state.refinements,
            [attributeName]: [...oldValue, value],
          },
        };
      }

      const newValue = state.refinements[attributeName].slice();
      newValue.splice(index, 1);
      return {
        ...state,
        refinements: {
          ...state.refinements,
          [attributeName]: newValue,
        },
      };
    });
  };

  onRefine = ({ attributeName, value }) =>
    this.setState(state => ({
      ...state,
      refinements: {
        ...state.refinements,
        [attributeName]: value,
      },
    }));

  render() {
    return (
      <InstantSearch
        appId="OFCNCOG2CU"
        apiKey="f54e21fa3a2a0160595bb058179bfb1e"
        indexName="npm-search"
      >
        <Configure
          attributesToRetrieve={[
            'name',
            'description',
            'keywords',
            'owner.name',
          ]}
        />
        <SearchBox />
        <CurrentRefinements />
        <div style={{ display: 'flex', border: '1px solid black' }}>
          <RefinementList attributeName="keywords" withSearchBox />
          <RefinementList attributeName="owner.name" withSearchBox />
        </div>
        <VirtualRefinementList
          attributeName="keywords"
          defaultRefinement={[...this.state.refinements.keywords]}
          onRefine={this.onRefine}
        />
        <VirtualRefinementList
          attributeName="owner.name"
          defaultRefinement={[...this.state.refinements['owner.name']]}
          onRefine={this.onRefine}
        />
        <Hits
          hitComponent={({ hit }) => <Hit hit={hit} refine={this.refine} />}
        />
      </InstantSearch>
    );
  }
}
```

This then gets us our result, as seen in the beginning: 

<iframe src="https://codesandbox.io/embed/oY1klpZYB" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Have a nice day ☀️
