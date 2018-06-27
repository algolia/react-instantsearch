import React, { Component } from 'react';
import orderBy from 'lodash.orderby';
import { setAddon, storiesOf } from '@storybook/react';
import { boolean, number, array } from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';
import {
  Panel,
  RefinementList,
  SearchBox,
  connectStateResults,
} from 'react-instantsearch-dom';
import { displayName, filterProps, WrapWithHits } from './util';

setAddon(JSXAddon);

const stories = storiesOf('RefinementList', module);

stories
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits linkedStoryGroup="RefinementList" hasPlayground={true}>
        <RefinementList attribute="category" />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with selected item',
    () => (
      <WrapWithHits linkedStoryGroup="RefinementList" hasPlayground={true}>
        <RefinementList attribute="category" defaultRefinement={['Dining']} />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with show more',
    () => (
      <WrapWithHits linkedStoryGroup="RefinementList" hasPlayground={true}>
        <RefinementList
          attribute="category"
          limit={2}
          showMoreLimit={5}
          showMore={true}
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with search inside items',
    () => (
      <WrapWithHits linkedStoryGroup="RefinementList" hasPlayground={true}>
        <RefinementList attribute="category" searchable />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with the sort strategy changed',
    () => (
      <WrapWithHits linkedStoryGroup="RefinementList" hasPlayground={true}>
        <RefinementList
          attribute="category"
          transformItems={items =>
            orderBy(items, ['label', 'count'], ['asc', 'desc'])
          }
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with Panel',
    () => (
      <WrapWithHits linkedStoryGroup="RefinementList" hasPlayground={true}>
        <Panel header="Refinement List" footer="Footer">
          <RefinementList attribute="category" />
        </Panel>
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with Panel but no refinement',
    () => (
      <WrapWithHits
        searchBox={false}
        linkedStoryGroup="RefinementList"
        hasPlayground={true}
      >
        <Panel header="Refinement List" footer="Footer">
          <RefinementList attribute="category" />
        </Panel>

        <div style={{ display: 'none' }}>
          <SearchBox defaultRefinement="ds" />
        </div>
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'playground',
    () => (
      <WrapWithHits linkedStoryGroup="RefinementList">
        <RefinementList
          attribute="category"
          defaultRefinement={array('defaultSelectedItem', [
            'Decoration',
            'Lighting',
          ])}
          limit={number('limit', 10)}
          showMoreLimit={number('showMoreLimit', 20)}
          showMore={boolean('showMore', true)}
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'with re-render',
    () => {
      class Example extends Component {
        state = {
          count: 0,
          limit: 5,
          refinements: [],
        };

        onClickCounter = () => {
          this.setState(({ count }) => ({
            count: count + 1,
          }));
        };

        onClickLimit = value => () => {
          this.setState(({ limit }) => ({
            limit: limit + value,
          }));
        };

        onClickPush = value => () => {
          this.setState(({ refinements }) => ({
            refinements: refinements.concat(value),
          }));
        };

        render() {
          return (
            <div>
              <p>
                <button onClick={this.onClickCounter}>
                  Useless update ({this.state.count})
                </button>
              </p>

              <p>
                <button onClick={this.onClickLimit(-1)}>-</button>
                <span>Count ({this.state.limit})</span>
                <button onClick={this.onClickLimit(+1)}>+</button>
              </p>

              <p>
                <button onClick={this.onClickPush('Decoration')}>
                  {'"Decoration"'}
                </button>

                <button onClick={this.onClickPush('Lighting')}>
                  {'"Lighting"'}
                </button>

                <button onClick={this.onClickPush('Eating')}>
                  {'"Eating"'}
                </button>
              </p>

              <RefinementList
                attribute="category"
                limit={this.state.limit}
                defaultRefinement={this.state.refinements}
                // defaultRefinement={['Decoration']}
                translations={{
                  showMore: extended => (extended ? 'Less' : 'More'),
                }}
              />
            </div>
          );
        }
      }

      const Connected = connectStateResults(Example);

      return (
        <WrapWithHits linkedStoryGroup="RefinementList">
          <Connected />
        </WrapWithHits>
      );
    },
    {
      displayName,
      filterProps,
    }
  );
