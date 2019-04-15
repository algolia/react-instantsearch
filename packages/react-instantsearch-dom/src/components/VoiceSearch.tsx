import React from 'react';
import { translatable, Translate } from 'react-instantsearch-core';
import { createClassNames } from '../core/utils';
const cx = createClassNames('VoiceSearch');

type VoiceListeningState = {
  status: string;
  transcript?: string;
  isSpeechFinal?: boolean;
  errorCode?: string;
};

type ToggleListening = (toggleListeningParams: {
  searchAsYouSpeak: boolean;
}) => void;

type InnerComponentProps = {
  status: string;
  errorCode?: string;
  isListening: boolean;
  transcript?: string;
  isSpeechFinal?: boolean;
  isBrowserSupported: boolean;
};

type VoiceSearchProps = {
  isBrowserSupported: boolean;
  isListening: boolean;
  toggleListening: ToggleListening;
  voiceListeningState: VoiceListeningState;
  searchAsYouSpeak?: boolean;

  translate: Translate;
  buttonComponent?: React.FunctionComponent<InnerComponentProps>;
  statusComponent?: React.FunctionComponent<InnerComponentProps>;
};

const DefaultButton: React.FunctionComponent<InnerComponentProps> = ({
  status,
  errorCode,
  isListening,
}) => {
  if (status === 'error' && errorCode === 'not-allowed') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
        <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    );
  } else if (isListening) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
          fill="currentColor"
        />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    );
  }
};

const DefaultStatusComponent: React.FC<InnerComponentProps> = ({
  status,
}) => <p>{status}</p>;

const VoiceSearch = ({
  translate,
  isBrowserSupported,
  isListening,
  toggleListening,
  voiceListeningState,
  searchAsYouSpeak = false,

  buttonComponent: Button = DefaultButtonComponent,
  statusComponent: StatusComponent = DefaultStatusComponent,
}: VoiceSearchProps) => {
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.blur();
    toggleListening({ searchAsYouSpeak });
  };

  const { status, transcript, isSpeechFinal, errorCode } = voiceListeningState;

  const innerProps = {
    status,
    errorCode,
    isListening,
    transcript,
    isSpeechFinal,
    isBrowserSupported,
  };

  return (
    <div className={cx('')}>
      <button
        className={cx('button')}
        type="button"
        title={translate('buttonTitle')}
        onClick={onClick}
        disabled={!isBrowserSupported}
      >
        <Button {...innerProps} />
      </button>
      <div className={cx('div')}>
        <StatusComponent {...innerProps} />
      </div>
    </div>
  );
};

export default translatable({
  buttonTitle: 'Search by voice',
})(VoiceSearch);
