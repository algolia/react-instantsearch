---
title: Migration Guide - From v4 to v5
mainTitle: Guides
layout: main.pug
category: guide
navWeight: 10
---

React V5 introduces **a complete revamp of the HTML output of most widgets**. The goal of this release is to provide improved semantics to our users.

This release also introduces a **new CSS naming convention** which will be reused across all InstantSearch libraries. This will enable the possibility to develop cross-libraries CSS themes easily.

This guide will provide step-by-step migration information for each widget & connector.

## Table of contents

* [Migration steps](guide/Migration_guide_v5.html#migration-steps)
  * [Updating widgets names](guide/Migration_guide_v5.html#updating-widgets-names)
  * [Updating styles](guide/Migration_guide_v5.html#updating-styles)
  * [Updating props](guide/Migration_guide_v5.html#updating-props)
  * [Adding className](guide/Migration_guide_v5.html#adding-classname)
* [Widgets changes](guide/Migration_guide_v5.html#widgets-changes)
  * [Breadcrumb](guide/Migration_guide_v5.html#breadcrumb)
  * [ClearAll](guide/Migration_guide_v5.html#clearall)
  * [CurrentRefinements](guide/Migration_guide_v5.html#currentrefinements)
  * [HierarchicalMenu](guide/Migration_guide_v5.html#hierarchicalmenu)
  * [Highlight](guide/Migration_guide_v5.html#highlight)
  * [Hits](guide/Migration_guide_v5.html#hits)
  * [HitsPerPage](guide/Migration_guide_v5.html#hitsperpage)
  * [InfiniteHits](guide/Migration_guide_v5.html#infinitehits)
  * [Menu](guide/Migration_guide_v5.html#menu)
  * [MenuSelect](guide/Migration_guide_v5.html#menuselect)
  * [MultiRange](guide/Migration_guide_v5.html#multirange)
  * [Pagination](guide/Migration_guide_v5.html#pagination)
  * [Panel](guide/Migration_guide_v5.html#panel)
  * [PoweredBy](guide/Migration_guide_v5.html#poweredby)
  * [RangeInput](guide/Migration_guide_v5.html#rangeinput)
  * [RefinementList](guide/Migration_guide_v5.html#refinementlist)
  * [SearchBox](guide/Migration_guide_v5.html#searchBox)
  * [SortBy](guide/Migration_guide_v5.html#sortby)
  * [StarRating](guide/Migration_guide_v5.html#starrating)
  * [Stats](guide/Migration_guide_v5.html#stats)
  * [Toggle](guide/Migration_guide_v5.html#toggle)
* [Connectors changes](guide/Migration_guide_v5.html#connectors-changes)
  * [connectCurrentRefinements](guide/Migration_guide_v5.html#connectcurrentrefinements)
  * [connectHierarchicalMenu](guide/Migration_guide_v5.html#connecthierarchicalmenu)
  * [connectHighlight](guide/Migration_guide_v5.html#connecthighlight)
  * [connectMenu](guide/Migration_guide_v5.html#connectmenu)
  * [connectMultiRange](guide/Migration_guide_v5.html#connectmultirange)
  * [connectPagination](guide/Migration_guide_v5.html#connectpagination)
  * [connectRange](guide/Migration_guide_v5.html#connectrange)
  * [connectRefinementList](guide/Migration_guide_v5.html#connectrefinementlist)
  * [connectToggle](guide/Migration_guide_v5.html#connecttoggle)

## Migration steps

### Updating widgets & connectors names

A few widgets & connectors have been renamed in order to improve the meaning as well as consistency between each InstantSearch library. You will need to **update your imports** to match new names.

Complete list of changes:

| Old name          | New name                |
| ----------------- | ----------------------- |
| ClearAll          | ClearRefinements        |
| MultiRange        | NumericMenu             |
| StarRating        | RatingMenu              |
| Toggle            | ToggleRefinement        |
| connectMultiRange | connectNumericMenu      |
| connectToggle     | connectToggleRefinement |

### Updating styles

The CSS naming convention used for widgets has been changed in favour of the [SUIT CSS](https://suitcss.github.io/) methodology.

In order to fix broken stylings, please refer to the **CSS naming equivalency table** of each widget in the [Widgets changes](guide/Migration_guide_v5.html#widgets-changes) section.

Two new CSS themes have also been written:

* reset.css
* algolia.css

We **strongly recommend** to use at least **reset.css** in order to neglect the visual side effects induced by the new semantic changes made on most widgets.

Please refer to the [Styling Widgets guide](guide/Styling_widgets.html) for more information on how to install and use those CSS themes.

### Updating props

Some of the props has been renamed for a better consistency across the library. See below the list of all of them:

* `attributeName` &rarr; `attribute`
* `limitMin` &rarr; `limit`
* `limitMax` &rarr; `showMoreLimit`
* `maxPages` &rarr; `totalPages`
* `pagesPadding` &rarr; `padding`
* `title` &rarr; `header`
* `submitComponent` &rarr; `submit`
* `resetComponent` &rarr; `reset`
* `loadingIndicatorComponent` &rarr; `loadingIndicator`
* `withSearchBox` &rarr; `searchable`

Please refer to [Widgets changes](guide/Migration_guide_v5.html#widgets-changes) & [Connectors changes](guide/Migration_guide_v5.html#connectors-changes) sections for more detail informations.

### Adding className

All the built-in widgets now accept a prop `className` that will be forwarded to the root element of the widgets.

```js
<RefinementList
  className="MyCustomRefinementList"
  attribute="category"
/>

// Will produce a DOM with
<div className="ais-RefinementList MyCustomRefinementList">
  // content of the RefinementList
</div>
```

## Widgets changes

**Note**: the equivalency table only shows the replacement classes for existing classes. New CSS classes are also available. For more details, please refer to the [Widgets guide](widgets).

### Breadcrumb

See [the widget](widgets/Breadcrumb.html) documentation page.

#### Naming

No change.

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name                  | New class name                                   |
| ------------------------------- | ------------------------------------------------ |
| .ais-Breadcrumb\_\_root         | .ais-Breadcrumb                                  |
| .ais-Breadcrumb\_\_itemLinkRoot | **Removed**. Target with `:first-child` instead. |
| .ais-Breadcrumb\_\_rootLabel    | **Removed**. Target with `:first-child` instead. |
| .ais-Breadcrumb\_\_item         | .ais-Breadcrumb-item                             |
| .ais-Breadcrumb\_\_itemLink     | .ais-Breadcrumb-link                             |
| .ais-Breadcrumb\_\_itemLabel    | **Removed**. Use `.ais-Breadcrumb-link` instead. |
| .ais-Breadcrumb\_\_itemDisabled | .ais-Breadcrumb-item\-\-selected                 |
| .ais-Breadcrumb\_\_separator    | .ais-Breadcrumb-separator                        |
| .ais-Breadcrumb\_\_noRefinement | .ais-Breadcrumb\-\-noRefinement                  |

### ClearAll

See [the widget](widgets/ClearRefinements.html) documentation page.

#### Naming

Renamed to **ClearRefinements**.

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name        | New class name               |
| --------------------- | ---------------------------- |
| .ais-ClearAll\_\_root | .ais-ClearRefinements-button |

### CurrentRefinements

See [the widget](widgets/CurrentRefinements.html) documentation page.

#### Naming

No change.

#### Behaviour

Instead of displaying the widget as `category: One ✕ Two ✕`, it now displays like this: `One ✕` `Two ✕`.

#### CSS classes equivalency table

| Old class name                          | New class name                          |
| --------------------------------------- | --------------------------------------- |
| .ais-CurrentRefinements\_\_root         | .ais-CurrentRefinements                 |
| .ais-CurrentRefinements\_\_items        | .ais-CurrentRefinements-list            |
| .ais-CurrentRefinements\_\_item         | .ais-CurrentRefinements-item            |
| .ais-CurrentRefinements\_\_itemLabel    | .ais-CurrentRefinements-label           |
| .ais-CurrentRefinements\_\_itemClear    | .ais-CurrentRefinements-delete          |
| .ais-CurrentRefinements\_\_noRefinement | .ais-CurrentRefinements\-\-noRefinement |

### HierarchicalMenu

See [the widget](widgets/HierarchicalMenu.html) documentation page.

#### Naming

* `limitMin` &rarr; `limit`
* `limitMax` &rarr; `showMoreLimit`

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name                              | New class name                                                                                     |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| .ais-HierarchicalMenu\_\_root               | .ais-HierarchicalMenu                                                                              |
| .ais-HierarchicalMenu\_\_items              | .ais-HierarchicalMenu-list                                                                         |
| .ais-HierarchicalMenu\_\_item               | .ais-HierarchicalMenu-item                                                                         |
| .ais-HierarchicalMenu\_\_itemSelected       | .ais-HierarchicalMenu-item\-\-selected                                                             |
| .ais-HierarchicalMenu\_\_itemParent         | .ais-HierarchicalMenu-item\-\-parent                                                               |
| .ais-HierarchicalMenu\_\_itemSelectedParent | **Removed**. Use `.ais-HierarchicalMenu-item--selected.ais-HierarchicalMenu-item--parent` instead. |
| .ais-HierarchicalMenu\_\_itemLink           | .ais-HierarchicalMenu-link                                                                         |
| .ais-HierarchicalMenu\_\_itemLabel          | .ais-HierarchicalMenu-label                                                                        |
| .ais-HierarchicalMenu\_\_itemCount          | .ais-HierarchicalMenu-count                                                                        |
| .ais-HierarchicalMenu\_\_itemItems          | .ais-HierarchicalMenu-list\-\-child                                                                |
| .ais-HierarchicalMenu\_\_showMore           | .ais-HierarchicalMenu-showMore                                                                     |
| .ais-HierarchicalMenu\_\_noRefinement       | .ais-HierarchicalMenu\-\-noRefinement                                                              |

### Highlight

See [the widget](widgets/Highlight.html) documentation page.

#### Naming

* `attributeName` &rarr; `attribute`

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name                   | New class name                |
| -------------------------------- | ----------------------------- |
| .ais-Highlight                   | **No change**.                |
| .ais-Highlight\_\_highlighted    | .ais-Highlight-highlighted    |
| .ais-Highlight\_\_nonHighlighted | .ais-Highlight-nonHighlighted |

### Hits

See [the widget](widgets/Hits.html) documentation page.

#### Naming

No change.

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name    | New class name |
| ----------------- | -------------- |
| .ais-Hits\_\_root | .ais-Hits      |

### HitsPerPage

See [the widget](widgets/HitsPerPage.html) documentation page.

#### Naming

No change.

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name           | New class name   |
| ------------------------ | ---------------- |
| .ais-HitsPerPage\_\_root | .ais-HitsPerPage |

### InfiniteHits

See [the widget](widgets/InfiniteHits.html) documentation page.

#### Naming

No change.

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name            | New class name    |
| ------------------------- | ----------------- |
| .ais-InfiniteHits\_\_root | .ais-InfiniteHits |

### Menu

See [the widget](widgets/Menu.html) documentation page.

#### Naming

* `attributeName` &rarr; `attribute`
* `limitMin` &rarr; `limit`
* `limitMax` &rarr; `showMoreLimit`
* `withSearchBox` &rarr; `searchable`

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name                 | New class name                                                       |
| ------------------------------ | -------------------------------------------------------------------- |
| .ais-Menu\_\_root              | .ais-Menu                                                            |
| .ais-Menu\_\_items             | .ais-Menu-list                                                       |
| .ais-Menu\_\_item              | .ais-Menu-item                                                       |
| .ais-Menu\_\_itemLinkSelected  | **Removed**. Use `.ais-Menu-item--selected .ais-Menu-link` instead.  |
| .ais-Menu\_\_itemLink          | .ais-Menu-link                                                       |
| .ais-Menu\_\_itemLabelSelected | **Removed**. Use `.ais-Menu-item--selected .ais-Menu-label` instead. |
| .ais-Menu\_\_itemLabel         | .ais-Menu-label                                                      |
| .ais-Menu\_\_itemCount         | .ais-Menu-count                                                      |
| .ais-Menu\_\_itemCountSelected | **Removed**. Use `.ais-Menu-item--selected .ais-Menu-count` instead. |
| .ais-Menu\_\_showMore          | .ais-Menu-showMore                                                   |
| .ais-Menu\_\_SearchBox         | .ais-Menu-searchBox                                                  |
| .ais-Menu\_\_noRefinement      | .ais-Menu\-\-noRefinement                                            |

### MenuSelect

See [the widget](widgets/MenuSelect.html) documentation page.

#### Naming

* `attributeName` &rarr; `attribute`

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name            | New class name         |
| ------------------------- | ---------------------- |
| .ais-MenuSelect\_\_select | .ais-MenuSelect-select |
| .ais-MenuSelect\_\_option | .ais-MenuSelect-option |

### MultiRange

See [the widget](widgets/NumericMenu.html) documentation page.

#### Naming

Renamed to **NumericMenu**.

* `attributeName` &rarr; `attribute`

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name                       | New class name                                                                     |
| ------------------------------------ | ---------------------------------------------------------------------------------- |
| .ais-MultiRange\_\_root              | .ais-NumericMenu                                                                   |
| .ais-MultiRange\_\_items             | .ais-NumericMenu-list                                                              |
| .ais-MultiRange\_\_item              | .ais-NumericMenu-item                                                              |
| .ais-MultiRange\_\_itemSelected      | .ais-NumericMenu-item\-\-selected                                                  |
| .ais-MultiRange\_\_itemLabel         | .ais-NumericMenu-label                                                             |
| .ais-MultiRange\_\_itemLabelSelected | **Removed**. Use `.ais-NumericMenu-item--selected .ais-NumericMenu-label` instead. |
| .ais-MultiRange\_\_itemRadio         | .ais-NumericMenu-radio                                                             |
| .ais-MultiRange\_\_itemRadioSelected | **Removed**. Use `.ais-NumericMenu-item--selected .ais-NumericMenu-radio` instead. |
| .ais-MultiRange\_\_noRefinement      | .ais-NumericMenu\-\-noRefinement                                                   |
| .ais-MultiRange\_\_itemNoRefinement  | .ais-NumericMenu-item\-\-noRefinement                                              |
| .ais-MultiRange\_\_itemAll           | **Removed**.                                                                       |

### Pagination

See [the widget](widgets/Pagination.html) documentation page.

#### Naming

* `maxPages` &rarr; `totalPages`
* `pagesPadding` &rarr; `padding`

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name                  | New class name                       |
| ------------------------------- | ------------------------------------ |
| .ais-Pagination\_\_root         | .ais-Pagination                      |
| .ais-Pagination\_\_item         | .ais-Pagination-item                 |
| .ais-Pagination\_\_itemFirst    | .ais-Pagination-item\-\-firstPage    |
| .ais-Pagination\_\_itemPrevious | .ais-Pagination-item\-\-previousPage |
| .ais-Pagination\_\_itemPage     | .ais-Pagination-item\-\-page         |
| .ais-Pagination\_\_itemNext     | .ais-Pagination-item\-\-nextPage     |
| .ais-Pagination\_\_itemLast     | .ais-Pagination-item\-\-lastPage     |
| .ais-Pagination\_\_itemDisabled | .ais-Pagination-item\-\-disabled     |
| .ais-Pagination\_\_itemSelected | .ais-Pagination-item\-\-selected     |
| .ais-Pagination\_\_itemLink     | .ais-Pagination-link                 |
| .ais-Pagination\_\_noRefinement | .ais-Pagination\-\-noRefinement      |

### Panel

See [the widget](widgets/Panel.html) documentation page.

#### Naming

* `title` &rarr; `header`

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name             | New class name             |
| -------------------------- | -------------------------- |
| .ais-Panel\_\_root         | .ais-Panel                 |
| .ais-Panel\_\_title        | **Removed**.               |
| .ais-Panel\_\_noRefinement | .ais-Panel\-\-noRefinement |

### PoweredBy

See [the widget](widgets/PoweredBy.html) documentation page.

#### Naming

No change.

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name                | New class name      |
| ----------------------------- | ------------------- |
| .ais-PoweredBy\_\_root        | .ais-PoweredBy      |
| .ais-PoweredBy\_\_searchBy    | .ais-PoweredBy-text |
| .ais-PoweredBy\_\_algoliaLink | .ais-PoweredBy-link |

### RangeInput

See [the widget](widgets/RangeInput.html) documentation page.

#### Naming

* `attributeName` &rarr; `attribute`

#### Behaviour

The default `precision` previously `2` has been updated to `0`.

#### CSS classes equivalency table

| Old class name                  | New class name                  |
| ------------------------------- | ------------------------------- |
| .ais-RangeInput\_\_root         | .ais-RangeInput                 |
| .ais-RangeInput\_\_labelMin     | **Removed**.                    |
| .ais-RangeInput\_\_inputMin     | .ais-RangeInput-input\-\-min    |
| .ais-RangeInput\_\_separator    | .ais-RangeInput-separator       |
| .ais-RangeInput\_\_labelMax     | **Removed**.                    |
| .ais-RangeInput\_\_inputMax     | .ais-RangeInput-input\-\-max    |
| .ais-RangeInput\_\_submit       | .ais-RangeInput-submit          |
| .ais-RangeInput\_\_noRefinement | .ais-RangeInput\-\-noRefinement |

### RefinementList

See [the widget](widgets/RefinementList.html) documentation page.

#### Naming

* `attributeName` &rarr; `attribute`
* `limitMin` &rarr; `limit`
* `limitMax` &rarr; `showMoreLimit`
* `withSearchBox` &rarr; `searchable`

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name                              | New class name                                                                              |
| ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| .ais-RefinementList\_\_root                 | .ais-RefinementList                                                                         |
| .ais-RefinementList\_\_items                | .ais-RefinementList-list                                                                    |
| .ais-RefinementList\_\_item                 | .ais-RefinementList-item                                                                    |
| .ais-RefinementList\_\_itemSelected         | .ais-RefinementList-item\-\-selected                                                        |
| .ais-RefinementList\_\_itemCheckbox         | .ais-RefinementList-checkbox                                                                |
| .ais-RefinementList\_\_itemCheckboxSelected | **Removed**. Use `.ais-RefinementList-item--selected .ais-RefinementList-checkbox` instead. |
| .ais-RefinementList\_\_itemLabel            | .ais-RefinementList-label                                                                   |
| .ais-RefinementList\_\_itemLabelSelected    | **Removed**. Use `.ais-RefinementList-item--selected .ais-RefinementList-label` instead.    |
| .ais-RefinementList\_\_itemCount            | .ais-RefinementList-count                                                                   |
| .ais-RefinementList\_\_itemCountSelected    | **Removed**. Use `.ais-RefinementList-item--selected .ais-RefinementList-count` instead.    |
| .ais-RefinementList\_\_showMore             | .ais-RefinementList-showMore                                                                |
| .ais-RefinementList\_\_SearchBox            | .ais-RefinementList-searchBox                                                               |
| .ais-RefinementList\_\_noRefinement         | .ais-RefinementList\-\-noRefinement                                                         |

<h3 id="searchBox">
<!-- Avoid conflict with docsearch id -->
  SearchBox
  <a class="anchor" href="guide/Migration_guide_v5.html#searchBox" aria-hidden="true"></a>
</h3>

See [the widget](widgets/SearchBox.html) documentation page.

#### Naming

* `submitComponent` &rarr; `submit`
* `resetComponent` &rarr; `reset`
* `loadingIndicatorComponent` &rarr; `loadingIndicator`

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name                      | New class name                  |
| ----------------------------------- | ------------------------------- |
| .ais-SearchBox\_\_root              | .ais-SearchBox                  |
| .ais-SearchBox\_\_wrapper           | .ais-SearchBox-form             |
| .ais-SearchBox\_\_input             | .ais-SearchBox-input            |
| .ais-SearchBox\_\_submit            | .ais-SearchBox-submit           |
| .ais-SearchBox\_\_reset             | .ais-SearchBox-reset            |
| .ais-SearchBox\_\_loading-indicator | .ais-SearchBox-loadingIndicator |

### SortBy

See [the widget](widgets/SortBy.html) documentation page.

#### Naming

No change.

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name      | New class name |
| ------------------- | -------------- |
| .ais-SortBy\_\_root | .ais-SortBy    |

### StarRating

See [the widget](widgets/RatingMenu.html) documentation page.

#### Naming

Renamed to **RatingMenu**.

* `attributeName` &rarr; `attribute`

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name                             | New class name                                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| .ais-StarRating\_\_root                    | .ais-RatingMenu                                                                            |
| .ais-StarRating\_\_ratingLink              | .ais-RatingMenu-link                                                                       |
| .ais-StarRating\_\_ratingLinkSelected      | **Removed**. Use `.ais-RatingMenu-item--selected .ais-RatingMenu-link` instead.            |
| .ais-StarRating\_\_ratingLinkDisabled      | **Removed**. Use `.ais-RatingMenu-item--disabled .ais-RatingMenu-link` instead.            |
| .ais-StarRating\_\_ratingIcon              | .ais-RatingMenu-starIcon                                                                   |
| .ais-StarRating\_\_ratingIconSelected      | **Removed**. Use `.ais-RatingMenu-item--selected .ais-RatingMenu-starIcon` instead.        |
| .ais-StarRating\_\_ratingIconDisabled      | **Removed**. Use `.ais-RatingMenu-item--disabled .ais-RatingMenu-starIcon` instead.        |
| .ais-StarRating\_\_ratingIconEmpty         | .ais-RatingMenu-starIcon--empty                                                            |
| .ais-StarRating\_\_ratingIconEmptySelected | **Removed**. Use `.ais-RatingMenu-item--selected .ais-RatingMenu-starIcon--empty` instead. |
| .ais-StarRating\_\_ratingIconEmptyDisabled | **Removed**. Use `.ais-RatingMenu-item--disabled .ais-RatingMenu-starIcon--empty` instead. |
| .ais-StarRating\_\_ratingLabel             | .ais-RatingMenu-label                                                                      |
| .ais-StarRating\_\_ratingLabelSelected     | **Removed**. Use `.ais-RatingMenu-item--selected .ais-RatingMenu-label` instead.           |
| .ais-StarRating\_\_ratingLabelDisabled     | **Removed**. Use `.ais-RatingMenu-item--disabled .ais-RatingMenu-label` instead.           |
| .ais-StarRating\_\_ratingCount             | .ais-RatingMenu-count                                                                      |
| .ais-StarRating\_\_ratingCountSelected     | **Removed**. Use `.ais-RatingMenu-item--selected .ais-RatingMenu-count` instead.           |
| .ais-StarRating\_\_ratingCountDisabled     | **Removed**. Use `.ais-RatingMenu-item--disabled .ais-RatingMenu-count` instead.           |

### Stats

See [the widget](widgets/Stats.html) documentation page.

#### Naming

No change.

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name     | New class name  |
| ------------------ | --------------- |
| .ais-Stats\_\_root | .ais-Stats-text |

### Toggle

See [the widget](widgets/ToggleRefinement.html) documentation page.

#### Naming

Renamed to **ToggleRefinement**.

* `attributeName` &rarr; `attribute`

#### Behaviour

No change.

#### CSS classes equivalency table

| Old class name          | New class name       |
| ----------------------- | -------------------- |
| .ais-Toggle\_\_root     | .ais-Toggle          |
| .ais-Toggle\_\_checkbox | .ais-Toggle-checkbox |
| .ais-Toggle\_\_label    | .ais-Toggle-label    |

## Connectors changes

### connectCurrentRefinements

See [the connector](connectors/connectCurrentRefinements.html) documentation page.

#### Naming

The property `attributeName` in the provided props `items` has been renamed `attribute`.

#### Behaviour

No change.

### connectHierarchicalMenu

See [the connector](connectors/connectHierarchicalMenu.html) documentation page.

#### Naming

* `limitMin` &rarr; `limit`
* `limitMax` &rarr; `showMoreLimit`

#### Behaviour

No change.

### connectHighlight

See [the connector](connectors/connectHighlight.html) documentation page.

#### Naming

The property `attributeName` in the provided props `highlight` has been renamed `attribute`.

#### Behaviour

No change.

### connectMenu

See [the connector](connectors/connectMenu.html) documentation page.

#### Naming

* `attributeName` &rarr; `attribute`
* `limitMin` &rarr; `limit`
* `limitMax` &rarr; `showMoreLimit`
* `withSearchBox` &rarr; `searchable`

#### Behaviour

No change.

### connectMultiRange

See [the connector](connectors/connectNumericMenu.html) documentation page.

#### Naming

Renamed to **connectNumericMenu**.

* `attributeName` &rarr; `attribute`

#### Behaviour

No change.

### connectPagination

See [the connector](connectors/connectPagination.html) documentation page.

#### Naming

* `maxPages` &rarr; `totalPages`
* `pagesPadding` &rarr; `padding`

#### Behaviour

No change.

### connectRange

See [the connector](connectors/connectRange.html) documentation page.

#### Naming

* `attributeName` &rarr; `attribute`

#### Behaviour

The default `precision` previously `2` has been updated to `0`.

### connectRefinementList

See [the connector](connectors/connectRefinementList.html) documentation page.

#### Naming

* `attributeName` &rarr; `attribute`
* `limitMin` &rarr; `limit`
* `limitMax` &rarr; `showMoreLimit`
* `withSearchBox` &rarr; `searchable`

#### Behaviour

No change.

### connectToggle

See [the connector](connectors/connectToggleRefinement.html) documentation page.

#### Naming

Renamed to **connectToggleRefinement**.

* `attributeName` &rarr; `attribute`

#### Behaviour

No change.

<div class="guide-nav">
    <div class="guide-nav-left">
        Previous: <a href="guide/Migration_guide_v4.html">← Migration Guide - From v3 to v4</a>
    </div>
</div>
