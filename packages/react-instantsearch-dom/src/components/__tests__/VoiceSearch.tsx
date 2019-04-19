import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VoiceSearch from '../VoiceSearch';

const mockGetState = jest.fn();
const mockIsBrowserSupported = jest.fn();
const mockIsListening = jest.fn();
const mockToggleListening = jest.fn();

jest.mock('../../lib/voiceSearchHelper', () => {
  return () => {
    return {
      getState: mockGetState.mockImplementation(() => ({})),
      isBrowserSupported: mockIsBrowserSupported,
      isListening: mockIsListening,
      toggleListening: mockToggleListening,
    };
  };
});

Enzyme.configure({ adapter: new Adapter() });

describe('VoiceSearch', () => {
  describe('button', () => {
    it('calls toggleListening when button is clicked', () => {
      const wrapper = mount(<VoiceSearch />);
      wrapper.find('button').simulate('click');
      expect(mockToggleListening).toHaveBeenCalledTimes(1);
    });
  });

  describe('Rendering', () => {
    it('with default props', () => {
      const wrapper = mount(<VoiceSearch />);
      expect(wrapper).toMatchSnapshot();
    });

    it('with custom component for button with isListening: false', () => {
      const customButton = ({ isListening }) =>
        isListening ? 'Stop' : 'Start';

      const wrapper = mount(<VoiceSearch buttonComponent={customButton} />);
      expect(wrapper.find('button').text()).toBe('Start');
      expect(wrapper).toMatchSnapshot();
    });

    it('with custom component for button with isListening: true', () => {
      const customButton = ({ isListening }) =>
        isListening ? 'Stop' : 'Start';
      mockIsListening.mockImplementationOnce(() => true);

      const wrapper = mount(<VoiceSearch buttonComponent={customButton} />);
      expect(wrapper.find('button').text()).toBe('Stop');
      expect(wrapper).toMatchSnapshot();
    });

    it('with custom template for status', () => {
      const customStatus = ({
        status,
        errorCode,
        isListening,
        transcript,
        isSpeechFinal,
        isBrowserSupported,
      }) => (
        <div>
          <p>status: {status}</p>
          <p>errorCode: {errorCode}</p>
          <p>isListening: {isListening ? 'true' : 'false'}</p>
          <p>transcript: {transcript}</p>
          <p>isSpeechFinal: {isSpeechFinal ? 'true' : 'false'}</p>
          <p>isBrowserSupported: {isBrowserSupported ? 'true' : 'false'}</p>
        </div>
      );

      mockIsListening.mockImplementationOnce(() => true);
      mockGetState.mockImplementationOnce(() => ({
        status: 'recognizing',
        transcript: 'Hello',
        isSpeechFinal: false,
        errorCode: undefined,
      }));

      const wrapper = mount(<VoiceSearch statusComponent={customStatus} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
