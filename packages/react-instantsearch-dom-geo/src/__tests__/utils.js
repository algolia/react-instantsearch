import PropTypes from 'prop-types';
import { createFakeMarkerInstance } from '../../test/mockGoogleMaps';
import * as utils from '../utils';

describe('utils', () => {
  describe('registerEvents', () => {
    it('expect to add listeners from events', () => {
      const onClick = () => {};
      const onMouseMove = () => {};
      const instance = createFakeMarkerInstance();

      const events = {
        onClick: 'click',
        onMouseMove: 'mousemove',
      };

      const props = {
        onClick,
        onMouseMove,
      };

      utils.registerEvents(events, props, instance);

      expect(instance.addListener).toHaveBeenCalledTimes(2);
      expect(instance.addListener).toHaveBeenCalledWith('click', onClick);
      expect(instance.addListener).toHaveBeenCalledWith(
        'mousemove',
        onMouseMove
      );
    });

    it('expect to only add listeners listed from events', () => {
      const onClick = () => {};
      const onMouseEnter = () => {};
      const instance = createFakeMarkerInstance();

      const events = {
        onClick: 'click',
        onMouseMove: 'mousemove',
      };

      const props = {
        onClick,
        onMouseEnter,
      };

      utils.registerEvents(events, props, instance);

      expect(instance.addListener).toHaveBeenCalledTimes(1);
      expect(instance.addListener).toHaveBeenCalledWith('click', onClick);
    });

    it('expect to only add listeners listed from props', () => {
      const onClick = () => {};
      const instance = createFakeMarkerInstance();

      const events = {
        onClick: 'click',
        onMouseMove: 'mousemove',
      };

      const props = {
        onClick,
      };

      utils.registerEvents(events, props, instance);

      expect(instance.addListener).toHaveBeenCalledTimes(1);
      expect(instance.addListener).toHaveBeenCalledWith('click', onClick);
    });

    it('expect to return a function that remove the listeners', () => {
      const onClick = () => {};
      const onMouseMove = () => {};
      const remove = jest.fn();
      const instance = createFakeMarkerInstance();

      instance.addListener.mockImplementation(() => ({
        remove,
      }));

      const events = {
        onClick: 'click',
        onMouseMove: 'mousemove',
      };

      const props = {
        onClick,
        onMouseMove,
      };

      const removeEventListeners = utils.registerEvents(
        events,
        props,
        instance
      );

      expect(remove).toHaveBeenCalledTimes(0);

      removeEventListeners();

      expect(remove).toHaveBeenCalledTimes(2);
    });
  });

  describe('createListenersPropType', () => {
    it('expect to return an object with listeners propType from event types', () => {
      const events = {
        onClick: '',
        onMouseMove: '',
      };

      const expectation = {
        onClick: PropTypes.func,
        onMouseMove: PropTypes.func,
      };

      const actual = utils.createListenersPropType(events);

      expect(actual).toEqual(expectation);
    });

    it('expect to return an empty object from empty event types', () => {
      const events = {};

      const expectation = {};
      const actual = utils.createListenersPropType(events);

      expect(actual).toEqual(expectation);
    });
  });
});
