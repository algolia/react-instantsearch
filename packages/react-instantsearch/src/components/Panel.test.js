import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Panel from './Panel';

Enzyme.configure({ adapter: new Adapter() });

describe('Panel', () => {
  it('expect to render', () => {
    const wrapper = shallow(
      <Panel>
        <div>Hello content</div>
      </Panel>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render with custom className', () => {
    const props = {
      className: 'ais-Panel-Breadcrumb',
    };

    const wrapper = shallow(
      <Panel {...props}>
        <div>Hello content</div>
      </Panel>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render without refinement', () => {
    const props = {
      canRefine: false,
    };

    const wrapper = shallow(
      <Panel {...props}>
        <div>Hello content</div>
      </Panel>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render with header', () => {
    const props = {
      header: <p>Header</p>,
    };

    const wrapper = shallow(
      <Panel {...props}>
        <div>Hello content</div>
      </Panel>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('expect to render with footer', () => {
    const props = {
      footer: <p>Footer</p>,
    };

    const wrapper = shallow(
      <Panel {...props}>
        <div>Hello content</div>
      </Panel>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
