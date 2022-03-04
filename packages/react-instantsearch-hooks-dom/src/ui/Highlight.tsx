import React, { Fragment } from 'react';

import { cx } from './lib/cx';

import type { CSSClass } from './lib/cx';

type HighlightPartProps = {
  children: React.ReactNode;
  cssClasses: HighlightCSSClasses;
  highlightedTagName: React.ReactType;
  nonHighlightedTagName: React.ReactType;
  isHighlighted: boolean;
};

function HighlightPart({
  cssClasses,
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
          ? cx(cssClasses.highlighted)
          : cx(cssClasses.nonHighlighted)
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

export type HighlightCSSClasses = {
  /**
   * Class names to apply to the root element
   */
  root: CSSClass;
  /**
   * Class names to apply to the matching parts
   */
  highlighted: CSSClass;
  /**
   * Class names to apply to the non-matching parts
   */
  nonHighlighted: CSSClass;
  /**
   * Class names to apply to the separator between different matches
   */
  separator: CSSClass;
};

export type HighlightProps = React.HTMLAttributes<HTMLSpanElement> & {
  cssClasses: HighlightCSSClasses;
  highlightedTagName?: React.ReactType;
  nonHighlightedTagName?: React.ReactType;
  separator?: React.ReactNode;
  parts: HighlightedPart[][];
};

export function Highlight({
  parts,
  highlightedTagName = 'mark',
  nonHighlightedTagName = 'span',
  separator = ', ',
  cssClasses,
  ...props
}: HighlightProps) {
  return (
    <span {...props} className={cx(cssClasses.root, props.className)}>
      {parts.map((part, partIndex) => {
        const isLastPart = partIndex === parts.length - 1;

        return (
          <Fragment key={partIndex}>
            {part.map((subPart, subPartIndex) => (
              <HighlightPart
                key={subPartIndex}
                cssClasses={cssClasses}
                highlightedTagName={highlightedTagName}
                nonHighlightedTagName={nonHighlightedTagName}
                isHighlighted={subPart.isHighlighted}
              >
                {subPart.value}
              </HighlightPart>
            ))}

            {!isLastPart && (
              <span className={cx(cssClasses.separator)}>{separator}</span>
            )}
          </Fragment>
        );
      })}
    </span>
  );
}
