/* eslint-env jest, jasmine */

import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import RatingMenu from './RatingMenu';

describe('RatingMenu', () => {
  it('supports passing max/min values', () => {
    const tree = renderer
      .create(
        <RatingMenu
          cx={(...x) => x.join(' ')}
          createURL={() => '#'}
          refine={() => null}
          min={1}
          max={5}
          currentRefinement={{ min: 1, max: 5 }}
          count={[
            { value: '1', count: 1 },
            { value: '2', count: 2 },
            { value: '3', count: 3 },
            { value: '4', count: 4 },
            { value: '5', count: 5 },
          ]}
          canRefine={true}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('applies translations', () => {
    const tree = renderer
      .create(
        <RatingMenu
          cx={(...x) => x.join(' ')}
          createURL={() => '#'}
          refine={() => null}
          translations={{
            ratingLabel: ' & Up',
          }}
          min={1}
          max={5}
          currentRefinement={{ min: 1, max: 5 }}
          count={[
            { value: '1', count: 1 },
            { value: '2', count: 2 },
            { value: '3', count: 3 },
            { value: '4', count: 4 },
            { value: '5', count: 5 },
          ]}
          canRefine={true}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  const refine = jest.fn();
  const createURL = jest.fn();
  const starRating = (
    <RatingMenu
      cx={(...x) => x.join(' ')}
      createURL={createURL}
      refine={refine}
      min={1}
      max={5}
      currentRefinement={{ min: 1, max: 5 }}
      count={[
        { value: '1', count: 4 },
        { value: '2', count: 2 },
        { value: '3', count: 3 },
        { value: '4', count: 3 },
        { value: '5', count: 0 },
      ]}
      canRefine={true}
    />
  );

  beforeEach(() => {
    refine.mockClear();
    createURL.mockClear();
  });

  it('should create an URL for each row except for the largest: the default selected one', () => {
    const wrapper = mount(starRating);

    expect(createURL.mock.calls).toHaveLength(3);
    expect(createURL.mock.calls[0][0]).toEqual({ min: 4, max: 5 });
    expect(createURL.mock.calls[1][0]).toEqual({ min: 3, max: 5 });
    expect(createURL.mock.calls[2][0]).toEqual({ min: 2, max: 5 });

    wrapper.unmount();
  });

  it('refines its value on change', () => {
    const wrapper = mount(starRating);
    const links = wrapper.find('.link');
    expect(links).toHaveLength(5);

    let selectedItem = wrapper.find('.item--selected');
    expect(selectedItem).toHaveLength(1);

    links.first().simulate('click');

    expect(refine.mock.calls).toHaveLength(0);

    selectedItem = wrapper.find('.item--selected');
    expect(selectedItem).toBeDefined();

    const disabledIcon = wrapper.find('.item--disabled').find('.starIcon');

    expect(disabledIcon).toHaveLength(5);
    wrapper.unmount();
  });

  it('should display the right number of stars', () => {
    const wrapper = mount(starRating);
    wrapper
      .find('.link')
      .last()
      .simulate('click');

    const selectedItem = wrapper.find('.item--selected');

    const fullIcon = selectedItem.find('.starIcon--full');
    const emptyIcon = selectedItem.find('.starIcon--empty');

    expect(fullIcon).toHaveLength(1);
    expect(emptyIcon).toHaveLength(4);
    wrapper.unmount();
  });

  it('clicking on the selected refinement should select the largest range', () => {
    const wrapper = mount(starRating);
    wrapper.setProps({ currentRefinement: { min: 4, max: 5 } });

    const links = wrapper.find('.link');
    links.at(1).simulate('click');

    expect(refine.mock.calls).toHaveLength(1);
    expect(refine.mock.calls[0][0]).toEqual({ min: 1, max: 5 });
    wrapper.unmount();
  });

  it('the default selected range should be the lowest one with count', () => {
    const wrapper = mount(starRating);
    wrapper.setProps({
      count: [
        { value: '2', count: 2 },
        { value: '3', count: 3 },
        { value: '4', count: 3 },
      ],
    });

    const items = wrapper.find('.item');
    expect(items.first().hasClass('item--selected')).toBe(false);

    const selected = wrapper.find('.item--selected');
    expect(selected.find('.starIcon--empty')).toHaveLength(3);
    expect(selected.find('.starIcon--full')).toHaveLength(2);
    expect(selected.text()).toContain('8');

    wrapper.unmount();
  });
});
