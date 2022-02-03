import React from 'react';

import { cx } from './lib/cx';

type HighlightedPart = {
  value: string;
  isHighlighted: boolean;
};

type HighlightPartProps = {
  children: React.ReactNode;
  highlightedTagName: React.ReactType;
  nonHighlightedTagName: React.ReactType;
  isHighlighted: boolean;
};

function HighlightPart({
  children,
  highlightedTagName,
  isHighlighted,
  nonHighlightedTagName,
}: HighlightPartProps) {
  const TagName = isHighlighted ? highlightedTagName : nonHighlightedTagName;

  return (
    <TagName
      className={
        isHighlighted
          ? 'ais-Highlight--highlighted'
          : 'ais-Highlight--nonHighlighted'
      }
    >
      {children}
    </TagName>
  );
}

export type HighlightProps = {
  parts: HighlightedPart[];
  highlightedTagName?: React.ReactType;
  nonHighlightedTagName?: React.ReactType;
  className?: string;
  separator?: string;
};

export function Highlight({
  parts,
  highlightedTagName = 'mark',
  nonHighlightedTagName = 'span',
  separator = ', ',
  ...rest
}: HighlightProps) {
  return (
    <span {...rest} className={cx('ais-Highlight', rest.className)}>
      {parts.map((part, partIndex) => {
        if (Array.isArray(part)) {
          const isLastPart = partIndex === parts.length - 1;

          return (
            <span key={partIndex}>
              {part.map((subPart, subPartIndex) => (
                <HighlightPart
                  key={subPartIndex}
                  highlightedTagName={highlightedTagName}
                  nonHighlightedTagName={nonHighlightedTagName}
                  isHighlighted={subPart.isHighlighted}
                >
                  {subPart.value}
                </HighlightPart>
              ))}

              {!isLastPart && (
                <span className="ais-Highlight-separator">{separator}</span>
              )}
            </span>
          );
        }

        return (
          <HighlightPart
            key={partIndex}
            highlightedTagName={highlightedTagName}
            nonHighlightedTagName={nonHighlightedTagName}
            isHighlighted={part.isHighlighted}
          >
            {part.value}
          </HighlightPart>
        );
      })}
    </span>
  );
}
