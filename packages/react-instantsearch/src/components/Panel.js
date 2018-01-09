import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createClassNames from './createClassNames';

const cx = createClassNames('Panel');

const Panel = ({ children, className, canRefine, header, footer }) => (
  <div className={classNames(cx('', !canRefine && '-noRefinement'), className)}>
    {header && <div className={cx('header')}>{header}</div>}

    <div className={cx('body')}>{children}</div>

    {footer && <div className={cx('footer')}>{footer}</div>}
  </div>
);

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  canRefine: PropTypes.bool,
  header: PropTypes.node,
  footer: PropTypes.node,
};

Panel.defaultProps = {
  className: '',
  canRefine: true,
  header: null,
  footer: null,
};

export default Panel;
