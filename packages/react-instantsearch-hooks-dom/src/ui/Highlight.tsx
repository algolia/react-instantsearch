import React, { Fragment } from 'react';

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
  parts: HighlightedPart[][];
};

export function Highlight({
  baseClassName,
  parts,
  highlightedTagName = 'mark',
  nonHighlightedTagName = 'span',
  separator = ', ',
  ...props
}: HighlightProps) {
  return (
    <span {...props} className={cx(baseClassName, props.className)}>
      {parts.map((part, partIndex) => {
        const isLastPart = partIndex === parts.length - 1;

        return (
          <Fragment key={partIndex}>
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
          </Fragment>
        );
      })}
    </span>
  );
}
