import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { useConfigure, useHierarchicalMenu } from '..';
import { createInstantSearchTestWrapper } from '../../../../test/utils';
import { useBreadcrumb } from '../useBreadcrumb';

import type { UseHierarchicalMenuProps, UseConfigureProps } from '..';

describe('useBreadcrumb', () => {
  test('returns the connector render state', async () => {
    const wrapper = createInstantSearchTestWrapper();
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useBreadcrumb({
          attributes: [
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2',
          ],
        }),
      {
        wrapper,
      }
    );

    // Initial render state from manual `getWidgetRenderState`
    expect(result.current).toEqual({
      canRefine: false,
      createURL: expect.any(Function),
      items: [],
      refine: expect.any(Function),
    });

    await waitForNextUpdate();

    // InstantSearch.js state from the `render` lifecycle step
    expect(result.current).toEqual({
      canRefine: false,
      createURL: expect.any(Function),
      items: [],
      refine: expect.any(Function),
    });
  });

  test('returns the connector render state with initial UI state', async () => {
    const wrapper = createInstantSearchTestWrapper();
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useBreadcrumb({
          attributes: [
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2',
          ],
        }),
      {
        wrapper: ({ children }) =>
          wrapper({
            children: (
              <>
                <Configure
                  hierarchicalFacets={[
                    {
                      name: 'hierarchicalCategories.lvl0',
                      attributes: [
                        'hierarchicalCategories.lvl0',
                        'hierarchicalCategories.lvl1',
                        'hierarchicalCategories.lvl2',
                      ],
                      separator: ' > ',
                      rootPath: null,
                      showParentLevel: true,
                    },
                  ]}
                  hierarchicalFacetsRefinements={{
                    'hierarchicalCategories.lvl0': [
                      'Appliances > Air Conditioners > In-Wall Air Conditioners',
                    ],
                  }}
                />
                {children}
              </>
            ),
          }),
      }
    );

    // Initial render state from manual `getWidgetRenderState`
    expect(result.current).toEqual({
      canRefine: false,
      createURL: expect.any(Function),
      items: [],
      refine: expect.any(Function),
    });

    await waitForNextUpdate();

    // InstantSearch.js state from the `render` lifecycle step
    expect(result.current).toEqual({
      canRefine: false,
      createURL: expect.any(Function),
      items: [],
      refine: expect.any(Function),
    });
  });
});

function Configure(props: UseConfigureProps) {
  useConfigure(props);

  return null;
}

function HierarchicalMenu(props: UseHierarchicalMenuProps) {
  useHierarchicalMenu(props);

  return null;
}
