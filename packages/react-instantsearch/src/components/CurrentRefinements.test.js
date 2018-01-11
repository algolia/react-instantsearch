/* eslint-env jest, jasmine */

import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CurrentRefinements from './CurrentRefinements';

Enzyme.configure({ adapter: new Adapter() });

describe('CurrentRefinements', () => {
  it('renders a list of current refinements', () =>
    expect(
      renderer
        .create(
          <CurrentRefinements
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

  it('renders a list of current refinements with a custom className', () =>
    expect(
      renderer
        .create(
          <CurrentRefinements
            className="MyCustomCurrentRefinements"
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

  it('renders a empty list with no current refinements', () =>
    expect(
      renderer
        .create(
          <CurrentRefinements
            refine={() => null}
            items={[]}
            canRefine={false}
          />
        )
        .toJSON()
    ).toMatchSnapshot());

  it('allows clearing unique items of a refinement', () =>
    expect(
      renderer
        .create(
          <CurrentRefinements
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
