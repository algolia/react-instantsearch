import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VoiceSearch from '../VoiceSearch';

Enzyme.configure({ adapter: new Adapter() });

const renderAndMatchSnapshot = (element: JSX.Element) => {
  const instance = renderer.create(element);
  expect(instance.toJSON()).toMatchSnapshot();
  instance.unmount();
};

const defaultProps = {
  isBrowserSupported: true,
  isListening: false,
  toggleListening: () => {},
  voiceListeningState: {
    status: 'initial',
    transcript: undefined,
    isSpeechFinal: undefined,
    errorCode: undefined,
  },
};

describe('VoiceSearch', () => {
  it('does nothing', () => {
    expect(true).toBe(true);
  });

  describe('button', () => {
    it('calls toggleListening when button is clicked', () => {
      const props = {
        ...defaultProps,
        toggleListening: jest.fn(),
      };
      const wrapper = mount(<VoiceSearch {...props} />);
      wrapper.find('button').simulate('click');
      expect(props.toggleListening).toHaveBeenCalledTimes(1);
    });
  });

  describe('Rendering', () => {
    it('with default props', () => {
      renderAndMatchSnapshot(<VoiceSearch {...defaultProps} />);
    });

    it('with custom component for button with isListening: false', () => {
      const customButton = ({ isListening }) => (
        <button>{isListening ? 'Stop' : 'Start'}</button>
      );

      renderAndMatchSnapshot(
        <VoiceSearch {...defaultProps} buttonComponent={customButton} />
      );
    });

    it('with custom component for button with isListening: true', () => {
      const customButton = ({ isListening }) => (
        <button>{isListening ? 'Stop' : 'Start'}</button>
      );

      const props = {
        isBrowserSupported: true,
        isListening: true,
        toggleListening: () => {},
        voiceListeningState: {
          status: 'recognizing',
          transcript: undefined,
          isSpeechFinal: undefined,
          errorCode: undefined,
        },
      };

      renderAndMatchSnapshot(
        <VoiceSearch {...props} buttonComponent={customButton} />
      );
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
          <p>isListening: {isListening}</p>
          <p>transcript: {transcript}</p>
          <p>isSpeechFinal: {isSpeechFinal}</p>
          <p>isBrowserSupported: {isBrowserSupported}</p>
        </div>
      );

      const props = {
        isBrowserSupported: true,
        isListening: true,
        toggleListening: () => {},
        voiceListeningState: {
          status: 'recognizing',
          transcript: 'Hello',
          isSpeechFinal: false,
          errorCode: undefined,
        },
      };

      renderAndMatchSnapshot(
        <VoiceSearch {...props} statusComponent={customStatus} />
      );
    });
  });
});
