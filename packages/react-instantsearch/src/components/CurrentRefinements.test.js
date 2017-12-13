import PropTypes from 'prop-types';
/* eslint-env jest, jasmine */

import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import CurrentRefinements from './CurrentRefinements';

describe('CurrentRefinements', () => {
  it('renders a list of current refinements', () =>
    expect(
      renderer
        .create(
          <CurrentRefinements
            cx={(...x) => x.join(' ')}
            refine={() => null}
            items={[
              {
                label: 'Genre',
                value: 'clear all genres',
              },
            ]}
            canRefine={true}
          />
        )
        .toJSON()
    ).toMatchSnapshot());

  it('allows clearing unique items of a refinement', () =>
    expect(
      renderer
        .create(
          <CurrentRefinements
            cx={(...x) => x.join(' ')}
            refine={() => null}
            items={[
              {
                label: 'Genre',
                value: 'clear all genres',
                items: [
                  {
                    label: 'Sci-fi',
                    value: 'clear sci-fi',
                  },
                ],
              },
            ]}
            canRefine={true}
          />
        )
        .toJSON()
    ).toMatchSnapshot());
});
