import PropTypes from 'prop-types';
import React from 'react';

const BaseWidget = ({ cx, children, header, footer, cantRefine }) => (
  <div className={cx('', cantRefine && `-noRefinement`)}>
    {header && <div className={`${cx('header')} ais-header`}>{header}</div>}
    <div className={`${cx('body')} ais-body`}>{children}</div>
    {footer && <div className={`${cx('footer')} ais-footer`}>{footer}</div>}
  </div>
);

BaseWidget.propTypes = {
  cx: PropTypes.func.isRequired,
  cantRefine: PropTypes.bool,
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
};

export default BaseWidget;
