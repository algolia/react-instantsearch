import React from 'react';
import MultiIndex from './App-Multi-Index';
import Mentions from './App-Mentions';
import { render } from '@testing-library/react';

describe('autocomplete recipe', () => {
  it('MultiIndex renders without crashing', () => {
    const { container } = render(<MultiIndex />);

    expect(container).toMatchSnapshot();
  });
  it('Mentions renders without crashing', () => {
    const { container } = render(<Mentions />);

    expect(container).toMatchSnapshot();
  });
});
