import React from 'react';

import { cx } from './lib/cx';

type HighlightPartProps = {
  children: React.ReactNode;
  baseClassName: string;
  highlightedTagName: React.ReactType;
  nonHighlightedTagName: React.ReactType;
  isHighlighted: boolean;
};

function HighlightPart({
  baseClassName,
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
          ? `${baseClassName}-highlighted`
          : `${baseClassName}-nonHighlighted`
      }
    >
      {children}
    </TagName>
  );
}

type HighlightedPart = {
  isHighlighted: boolean;
  value: string;
};

export type HighlightProps = React.HTMLAttributes<HTMLSpanElement> & {
  baseClassName: string;
  highlightedTagName?: React.ReactType;
  nonHighlightedTagName?: React.ReactType;
  separator?: React.ReactNode;
  parts: HighlightedPart[];
  partsMultiple: HighlightedPart[][];
};

export function Highlight({
  baseClassName,
  parts,
  partsMultiple,
  highlightedTagName = 'mark',
  nonHighlightedTagName = 'span',
  separator = ', ',
  ...props
}: HighlightProps) {
  return (
    <span {...props} className={cx(baseClassName, props.className)}>
      {partsMultiple.map((part, partIndex) => {
        const isLastPart = partIndex === partsMultiple.length - 1;

        return (
          <span key={partIndex}>
            {part.map((subPart, subPartIndex) => (
              <HighlightPart
                key={subPartIndex}
                baseClassName={baseClassName}
                highlightedTagName={highlightedTagName}
                nonHighlightedTagName={nonHighlightedTagName}
                isHighlighted={subPart.isHighlighted}
              >
                {subPart.value}
              </HighlightPart>
            ))}

            {!isLastPart && (
              <span className={`${baseClassName}-separator`}>{separator}</span>
            )}
          </span>
        );
      })}
      {parts.map((part, partIndex) => {
        return (
          <HighlightPart
            key={partIndex}
            baseClassName={baseClassName}
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
