import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('geo-search recipe', () => {
  it('App renders without crashing', () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });
});
