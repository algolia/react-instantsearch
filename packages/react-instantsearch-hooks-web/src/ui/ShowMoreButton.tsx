import React from 'react';

type ShowMoreButtonProps = React.ComponentProps<'button'> & {
  isShowingMore: boolean;
  translations: ShowMoreButtonTranslations;
};

export type ShowMoreButtonTranslations = {
  /**
   * Alternative text for the show more button.
   */
  showMoreButtonText: (showMoreButtonTextOptions: {
    isShowingMore: boolean;
  }) => string;
};

export function ShowMoreButton({
  isShowingMore,
  translations,
  ...props
}: ShowMoreButtonProps) {
  return (
    <button {...props}>
      {translations.showMoreButtonText({ isShowingMore })}
    </button>
  );
}
