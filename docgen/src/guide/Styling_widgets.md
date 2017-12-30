---
title: Styling widgets
mainTitle: Guides
layout: main.pug
category: guide
navWeight: 80
---

All widgets under the `react-instantsearch/dom` namespace are shipped with fixed CSS class names.

The format for those class names is `ais-NameOfWidget-element--modifier`.

The different class names used by every widgets are described on their respective documentation page. You
can also inspect the underlying DOM and style accordingly.

## Styling icons

You can style icons colors too, for example the `SearchBox` ones:

```css
.ais-SearchBox-reset svg,
.ais-SearchBox-submit svg {
  fill: red;
}
```

## Loading the theme

We do not load any CSS into your page automatically but we provide two themes that you can load
manually:

* reset.css
* algolia.css

We **strongly** recommend that you use at least **reset.css** in order to neglect visual side effects caused by the new HTML semantics.

### Via CDN

The themes are available on jsdelivr:

unminified:

* https://cdn.jsdelivr.net/npm/instantsearch.css@latest/themes/reset.css
* https://cdn.jsdelivr.net/npm/instantsearch.css@latest/themes/algolia.css

minified:

* https://cdn.jsdelivr.net/npm/instantsearch.css@latest/themes/reset-min.css
* https://cdn.jsdelivr.net/npm/instantsearch.css@latest/themes/algolia-min.css

You can either copy paste the content in your own app or use a direct link to jsdelivr:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@latest/themes/reset-min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@latest/themes/algolia-min.css">
```

### Via npm, Webpack

```shell
npm install instantsearch.css --save
npm install style-loader css-loader --save-dev
```

App.js:

```js
import 'instantsearch.css/themes/reset.css';
import 'instantsearch.css/themes/algolia.css';
```

webpack.config.babel.js:

```js
export default {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style?insertAt=top', 'css']
      }
    ]
  }
};
```

### Other bundlers

Any other module bundler like Browserify can be used to load our CSS. React InstantSearch
does not rely on any specific module bundler or module loader.

<div class="guide-nav">
    <div class="guide-nav-left">
        Previous: <a href="guide/Widgets.html">← Widgets</a>
    </div>
    <div class="guide-nav-right">
        Next: <a href="guide//Highlighting_results.html">Highlighting results →</a>
    </div>
</div>
