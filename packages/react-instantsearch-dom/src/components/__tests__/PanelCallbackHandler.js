import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PanelCallbackHandler from '../PanelCallbackHandler';
import { PanelProvider } from '../Panel';

Enzyme.configure({ adapter: new Adapter() });

describe('PanelCallbackHandler', () => {
  it('expect to render', () => {
    const wrapper = shallow(
      <PanelCallbackHandler canRefine={true}>
        <div>Hello content</div>
      </PanelCallbackHandler>
    );

    expect(wrapper).toMatchSnapshot();
  });

  describe('willMount', () => {
    it('expect to call setCanRefine when the context is given', () => {
      const setCanRefine = jest.fn();

      mount(
        <PanelProvider value={setCanRefine}>
          <PanelCallbackHandler canRefine={true}>
            <div>Hello content</div>
          </PanelCallbackHandler>
        </PanelProvider>
      );

      expect(setCanRefine).toHaveBeenCalledTimes(1);
      expect(setCanRefine).toHaveBeenCalledWith(true);
    });

    it('expect to not throw when the context is not given', () => {
      expect(() =>
        shallow(
          <PanelCallbackHandler canRefine={true}>
            <div>Hello content</div>
          </PanelCallbackHandler>
        )
      ).not.toThrow();
    });
  });

  describe('willReceiveProps', () => {
    it('expect to call setCanRefine when the context is given', () => {
      const setCanRefine = jest.fn();

      const wrapper = mount(
        <PanelProvider value={setCanRefine}>
          <PanelCallbackHandler canRefine={true}>
            <div>Hello content</div>
          </PanelCallbackHandler>
        </PanelProvider>
      );

      wrapper.setProps({
        children: (
          <PanelCallbackHandler canRefine={false}>
            <div>Hello content</div>
          </PanelCallbackHandler>
        ),
      });

      expect(setCanRefine).toHaveBeenCalledTimes(2);
      expect(setCanRefine).toHaveBeenLastCalledWith(false);
    });

    it('expect to not call setCanRefine when the nextProps is the same', () => {
      const setCanRefine = jest.fn();

      const wrapper = mount(
        <PanelProvider value={setCanRefine}>
          <PanelCallbackHandler canRefine={true}>
            <div>Hello content</div>
          </PanelCallbackHandler>
        </PanelProvider>
      );

      wrapper.setProps({
        children: (
          <PanelCallbackHandler canRefine={true}>
            <div>Hello content</div>
          </PanelCallbackHandler>
        ),
      });

      expect(setCanRefine).toHaveBeenCalledTimes(1);
    });

    it('expect to not throw when the context is not given', () => {
      expect(() => {
        const wrapper = shallow(
          <PanelCallbackHandler canRefine={true}>
            <div>Hello content</div>
          </PanelCallbackHandler>
        );

        wrapper.setProps({ canRefine: false });
      }).not.toThrow();
    });
  });
});
