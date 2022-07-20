/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('Server-side rendering recipes', () => {
  it('App renders without crashing', () => {
    const props = {
      indexName: 'index',
      searchClient: {
        search() {},
      },
    };
    const { container } = render(<App {...props} />);

    expect(container).toMatchSnapshot();
  });
});
