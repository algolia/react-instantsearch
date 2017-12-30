import React from 'react';
import PropTypes from 'prop-types';
import classNames from './classNames';

const Panel = ({ children, canRefine, cx, header, footer }) => (
  <div className={cx('', !canRefine && '-noRefinement')}>
    {header && <div className={`${cx('header')} ais-header`}>{header}</div>}

    <div className={`${cx('body')} ais-body`}>{children}</div>

    {footer && <div className={`${cx('footer')} ais-footer`}>{footer}</div>}
  </div>
);

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  canRefine: PropTypes.bool,
  cx: PropTypes.func,
  header: PropTypes.node,
  footer: PropTypes.node,
};

Panel.defaultProps = {
  canRefine: true,
  cx: classNames('Panel'),
};

export default Panel;
