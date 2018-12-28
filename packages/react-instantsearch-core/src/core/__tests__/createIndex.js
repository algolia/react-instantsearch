import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Index from '../../components/Index';
import createIndex from '../createIndex';

Enzyme.configure({ adapter: new Adapter() });

describe('createIndex', () => {
  const requiredProps = {
    indexName: 'indexName',
  };

  it('expects to create an Index', () => {
    const CustomIndex = createIndex({ Root: 'div' });

    const props = {
      ...requiredProps,
    };

    const wrapper = shallow(<CustomIndex {...props} />);

    expect(wrapper.is(Index)).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('expects to create an Index with the default root', () => {
    const CustomIndex = createIndex({ Root: 'div' });

    const props = {
      ...requiredProps,
    };

    const wrapper = shallow(<CustomIndex {...props} />);

    expect(wrapper.props().root).toEqual({
      Root: 'div',
    });
  });

  it('expects to create an Index with a custom root props', () => {
    const CustomIndex = createIndex({ Root: 'div' });

    const props = {
      ...requiredProps,
      root: {
        Root: 'span',
        props: {
          style: {
            flex: 1,
          },
        },
      },
    };

    const wrapper = shallow(<CustomIndex {...props} />);

    expect(wrapper.props().root).toEqual({
      Root: 'span',
      props: {
        style: {
          flex: 1,
        },
      },
    });
  });

  it('expects to create an Index with an indexId when provided', () => {
    const CustomIndex = createIndex({ Root: 'div' });

    const props = {
      ...requiredProps,
      indexId: 'indexId',
    };

    const wrapper = shallow(<CustomIndex {...props} />);

    expect(wrapper.props().indexId).toBe('indexId');
  });

  it("expects to create an Index with an indexId that fallback to indexName when it's not provided", () => {
    const CustomIndex = createIndex({ Root: 'div' });

    const props = {
      ...requiredProps,
    };

    const wrapper = shallow(<CustomIndex {...props} />);

    expect(wrapper.props().indexId).toBe('indexName');
  });

  it('expect to warn when an Index is used without an indexId', () => {
    const CustomIndex = createIndex({ Root: 'div' });

    const warn = jest.spyOn(console, 'warn');

    const props = {
      ...requiredProps,
    };

    shallow(<CustomIndex {...props} />);

    expect(warn).toHaveBeenCalledWith(
      '[React InstantSearch]: `indexId` is required for the `Index` component. Please use this prop before the next major version.'
    );

    warn.mockRestore();
  });

  it('expect to warn only once when an Index is used without an indexId', () => {
    const CustomIndex = createIndex({ Root: 'div' });

    const warn = jest.spyOn(console, 'warn');

    const props = {
      ...requiredProps,
    };

    shallow(<CustomIndex {...props} />);
    shallow(<CustomIndex {...props} />);
    shallow(<CustomIndex {...props} />);

    expect(warn).toHaveBeenCalledTimes(1);

    warn.mockRestore();
  });

  it('expect to not warn when an Index is used with an indexId', () => {
    const CustomIndex = createIndex({ Root: 'div' });

    const warn = jest.spyOn(console, 'warn');

    const props = {
      ...requiredProps,
      indexId: 'indexId',
    };

    shallow(<CustomIndex {...props} />);

    expect(warn).not.toHaveBeenCalled();

    warn.mockRestore();
  });
});
