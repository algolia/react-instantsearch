import React from 'react';
import { render } from '@testing-library/react';
import { Router, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { createMemoryHistory } from 'history';

import App from './App';

const history = createMemoryHistory('/');

describe('react-router recipe', () => {
  it('App renders without crashing', () => {
    const { container } = render(
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
    );

    expect(container).toMatchSnapshot();
  });
});
