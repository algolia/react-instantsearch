import React from 'react';
import { useHierarchicalMenu } from 'react-instantsearch-hooks';

import { HierarchicalMenu as HierarchicalMenuUiComponent } from '../ui/HierarchicalMenu';
import { cx } from '../ui/lib/cx';
import { ShowMoreButton } from '../ui/ShowMoreButton';

import type { HierarchicalMenuProps as HierarchicalMenuUiComponentProps } from '../ui/HierarchicalMenu';
import type { UseHierarchicalMenuProps } from 'react-instantsearch-hooks';

export type HierarchicalMenuProps = Omit<
  HierarchicalMenuUiComponentProps,
  'items' | 'createURL' | 'hasItems' | 'onNavigate' | 'showMoreButton'
> &
  UseHierarchicalMenuProps;

export function HierarchicalMenu({
  attributes,
  limit,
  rootPath,
  separator,
  showMore,
  showMoreLimit,
  showParentLevel,
  sortBy,
  transformItems,
  ...props
}: HierarchicalMenuProps) {
  const {
    items,
    canRefine,
    canToggleShowMore,
    createURL,
    isShowingMore,
    refine,
    toggleShowMore,
  } = useHierarchicalMenu(
    {
      attributes,
      limit,
      rootPath,
      separator,
      showMore,
      showMoreLimit,
      showParentLevel,
      sortBy,
      transformItems,
    },
    {
      $$widgetType: 'ais.hierarchicalMenu',
    }
  );

  return (
    <HierarchicalMenuUiComponent
      {...props}
      items={items}
      hasItems={canRefine}
      createURL={createURL}
      onNavigate={refine}
      showMoreButton={
        showMore && (
          <ShowMoreButton
            className={cx(
              'ais-HierarchicalMenu-showMore',
              !canToggleShowMore && 'ais-HierarchicalMenu-showMore--disabled'
            )}
            disabled={!canToggleShowMore}
            onClick={toggleShowMore}
            isShowingMore={isShowingMore}
          />
        )
      }
    />
  );
}
