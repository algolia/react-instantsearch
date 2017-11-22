import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { classNamesNew } from './classNames.js';

const cx = classNamesNew('Panel');

class Panel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  static childContextTypes = {
    canRefine: PropTypes.func,
  };

  getChildContext() {
    return { canRefine: this.canRefine };
  }

  constructor(props) {
    super(props);

    this.state = {
      canRefine: true,
    };
  }

  canRefine = canRefine => {
    this.setState({ canRefine });
  };

  render() {
    return (
      <div {...cx(['', !this.state.canRefine && '-noRefinement'])}>
        <h5 {...cx(['title'])}>{this.props.title}</h5>
        {this.props.children}
      </div>
    );
  }
}

export default Panel;
