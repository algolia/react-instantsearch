import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VoiceSearch from '../VoiceSearch';

const mockGetState = jest.fn().mockImplementation(() => ({}));
const mockIsBrowserSupported = jest.fn().mockImplementation(() => true);
const mockIsListening = jest.fn();
const mockToggleListening = jest.fn();

jest.mock('../../lib/voiceSearchHelper', () => {
  return () => {
    return {
      getState: mockGetState,
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
    });

    it('with custom component for button with isListening: true', () => {
      const customButton = ({ isListening }) =>
        isListening ? 'Stop' : 'Start';
      mockIsListening.mockImplementation(() => true);

      const wrapper = mount(<VoiceSearch buttonComponent={customButton} />);
      expect(wrapper.find('button').text()).toBe('Stop');
      mockIsListening.mockClear();
    });

    it('renders a specific title when it is disabled', () => {
      mockIsBrowserSupported.mockImplementation(() => false);
      const wrapper = mount(<VoiceSearch />);
      expect(wrapper.find('button').prop('title')).toBe(
        'Search by voice (not supported on this browser)'
      );
      mockIsBrowserSupported.mockImplementation(() => true);
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

      mockIsListening.mockImplementation(() => true);
      mockGetState.mockImplementation(() => ({
        status: 'recognizing',
        transcript: 'Hello',
        isSpeechFinal: false,
        errorCode: undefined,
      }));

      const wrapper = mount(<VoiceSearch statusComponent={customStatus} />);
      expect(wrapper.find('.ais-VoiceSearch-status')).toMatchSnapshot();
      mockIsListening.mockClear();
      mockGetState.mockClear();
    });
  });
});
