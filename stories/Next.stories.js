import React from 'react';
import { storiesOf } from '@storybook/react';
import { Hello } from 'react-instantsearch-next';

const stories = storiesOf('<Next>', module);

stories.add('default', () => <Hello />);
