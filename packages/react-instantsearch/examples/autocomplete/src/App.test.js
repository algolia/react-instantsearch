import React from 'react';
import MultiIndex from './App-Multi-Index';
import Mentions from './App-Mentions';
import renderer from 'react-test-renderer';

describe('autocomplete recipe', () => {
  it('MultiIndex renders without crashing', () => {
    const component = renderer.create(<MultiIndex />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
