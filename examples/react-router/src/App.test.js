import React from 'react';
import renderer from 'react-test-renderer';
import { Router, Route } from 'react-router-dom/cjs/react-router-dom.min';

import App from './App';

describe('react-router recipe', () => {
  it('App renders without crashing', () => {
    const component = renderer.create(
      <Router>
        <Route path="/" component={App} />
      </Router>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
