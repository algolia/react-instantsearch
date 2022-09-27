import React from 'react';

type ShowMoreButtonProps = React.ComponentProps<'button'> & {
  isShowingMore: boolean;
  translations: ShowMoreButtonTranslations;
};

export type ShowMoreButtonTranslations = {
  /**
   * Alternative text for the show more button.
   */
  showMoreButtonText: string;
  /**
   * Alternative text for the show less button.
   */
  showLessButtonText: string;
};

export function ShowMoreButton({
  isShowingMore,
  translations,
  ...props
}: ShowMoreButtonProps) {
  return (
    <button {...props}>
      {isShowingMore
        ? translations.showLessButtonText
        : translations.showMoreButtonText}
    </button>
  );
}
