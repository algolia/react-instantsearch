import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { classNamesNew } from './classNames.js';

class BaseWidget extends Component {
  static propTypes = {
    widgetClassName: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    header: PropTypes.node,
    footer: PropTypes.node,
  };

  render() {
    const { widgetClassName, children, header, footer } = this.props;
    const cx = classNamesNew(widgetClassName);

    return (
      <div {...cx([''])}>
        {header ? <div {...cx(['header'], 'ais-header')}>{header}</div> : null}
        <div {...cx(['body'], 'ais-body')}>{children}</div>
        {footer ? <div {...cx(['footer'], 'ais-footer')}>{footer}</div> : null}
      </div>
    );
  }
}

export default BaseWidget;
