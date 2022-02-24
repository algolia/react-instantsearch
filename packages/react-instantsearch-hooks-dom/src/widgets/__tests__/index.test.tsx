/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  InstantSearch,
  InstantSearchServerContext,
} from 'react-instantsearch-hooks';

import * as allWidgets from '../';
import { createSearchClient } from '../../../../../test/mock';

import type { InstantSearch as InstantSearchClass } from 'instantsearch.js';

/**
 * Uses the SSR APIs to access the InstantSearch widgets rendered by all React InstantSearch
 * components/widgets.
 */
function initializeWidgets() {
  return Object.entries(allWidgets).map(([name, Component]) => {
    let instantSearchInstance: InstantSearchClass | undefined = undefined;

    renderToString(
      <InstantSearchServerContext.Provider
        value={{
          notifyServer: ({ search }) => {
            instantSearchInstance = search;
          },
        }}
      >
        <InstantSearch
          searchClient={createSearchClient()}
          indexName="indexName"
        >
          <Component />
        </InstantSearch>
      </InstantSearchServerContext.Provider>
    );

    const renderedWidgets = instantSearchInstance!.mainIndex.getWidgets();

    return {
      name,
      renderedWidgets,
      widget: renderedWidgets[0],
    };
  });
}

describe('widgets', () => {
  const widgets = initializeWidgets();

  test('renders one widget', () => {
    widgets.forEach(({ name, renderedWidgets }) => {
      expect({ name, renderedWidgets }).toEqual({
        name,
        renderedWidgets: expect.objectContaining({
          length: 1,
        }),
      });
    });
  });

  describe('$$type', () => {
    test('is present in every widget', () => {
      widgets.forEach(({ name, renderedWidgets }) => {
        renderedWidgets.forEach((widget) =>
          expect([name, widget.$$type]).toEqual([name, expect.any(String)])
        );
      });
    });

    test('starts with "ais."', () => {
      widgets.forEach(({ name, widget }) =>
        expect([name, widget.$$type.substr(0, 4)]).toEqual([name, 'ais.'])
      );
    });
  });

  describe('$$widgetType', () => {
    test('is present in every widget', () => {
      widgets.forEach(({ name, widget }) =>
        expect([name, widget.$$widgetType]).toEqual([name, expect.any(String)])
      );
    });

    test('starts with "ais."', () => {
      widgets.forEach(({ name, widget }) =>
        expect([name, widget.$$widgetType!.substr(0, 4)]).toEqual([
          name,
          'ais.',
        ])
      );
    });
  });
});
