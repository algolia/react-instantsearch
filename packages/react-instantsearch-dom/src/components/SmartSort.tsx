import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createClassNames } from '../core/utils';

const cx = createClassNames('SmartSort');

type ComponentProps = {
  isSmartSorted: boolean;
};

export type SmartSortComponent = {
  buttonTextComponent: React.FunctionComponent<ComponentProps>;
  className?: string;
  isVirtualReplica: boolean;
  isSmartSorted: boolean;
  textComponent: React.FunctionComponent<ComponentProps>;
  refine(relevancyStrictness: number | undefined): void;
};

const SmartSort: React.FC<SmartSortComponent> = ({
  buttonTextComponent: ButtonTextComponent,
  className = '',
  isVirtualReplica,
  isSmartSorted,
  textComponent: TextComponent,
  refine,
}) => {
  if (!isVirtualReplica) {
    return null;
  }

  return (
    <div className={classNames(cx(''), className)}>
      <div className={cx('text')}>
        <TextComponent isSmartSorted={isSmartSorted} />
      </div>
      <button
        className={cx('button')}
        onClick={() => refine(isSmartSorted ? 0 : undefined)}
      >
        <ButtonTextComponent isSmartSorted={isSmartSorted} />
      </button>
    </div>
  );
};

SmartSort.propTypes = {
  buttonTextComponent: PropTypes.func.isRequired,
  className: PropTypes.string,
  isVirtualReplica: PropTypes.bool.isRequired,
  isSmartSorted: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
  textComponent: PropTypes.func.isRequired,
};

export default SmartSort;
