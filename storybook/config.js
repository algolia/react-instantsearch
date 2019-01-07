import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { checkA11y } from '@storybook/addon-a11y';
import { withOptions } from '@storybook/addon-options';

addDecorator(
  withOptions({
    name: 'react-instantsearch',
    url: 'https://github.com/algolia/react-instantsearch',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    addonPanelInRight: true,
  })
);

// adding decorators globally except for the JSX usage (added on a case per case basis)
// as not relevant for some stories with custom components
// or the ones that display unreadable output (MultiIndex, Highlight etc.)
addDecorator(withKnobs);
addDecorator(checkA11y);

const req = require.context('../stories', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
