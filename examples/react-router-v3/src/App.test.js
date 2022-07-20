import React from 'react';
import App from './App';
import { render } from '@testing-library/react';
import { Router, Route, browserHistory } from 'react-router';

describe('react-router-v3 recipe', () => {
  it('App renders without crashing', () => {
    const { container } = render(
      <Router history={browserHistory}>
        <Route path="/" component={App} />
      </Router>
    );

    expect(container).toMatchSnapshot();
  });
});
