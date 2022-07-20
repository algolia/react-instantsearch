import React from 'react';
import App from './App';
import { render } from '@testing-library/react';

describe('Multi index recipe', () => {
  it('App renders without crashing', () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });
});
