import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

describe('react-router recipe', () => {
  it('App renders without crashing', () => {
    const component = renderer.create(<App />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
