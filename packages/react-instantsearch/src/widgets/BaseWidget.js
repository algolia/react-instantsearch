import PropTypes from 'prop-types';
import React, { Component } from 'react';

class BaseWidget extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
    cantRefine: PropTypes.bool,
    children: PropTypes.node.isRequired,
    header: PropTypes.node,
    footer: PropTypes.node,
  };

  render() {
    const { cx, children, header, footer, cantRefine } = this.props;

    return (
      <div className={cx('', cantRefine && `-noRefinement`)}>
        {header && <div className={`${cx('header')} ais-header`}>{header}</div>}
        <div className={`${cx('body')} ais-body`}>{children}</div>
        {footer && <div className={`${cx('footer')} ais-footer`}>{footer}</div>}
      </div>
    );
  }
}

export default BaseWidget;
