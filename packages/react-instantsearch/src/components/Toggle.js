import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Toggle extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
    currentRefinement: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  };

  onChange = e => {
    this.props.refine(e.target.checked);
  };

  render() {
    const { cx, currentRefinement, label } = this.props;

    return (
      <label className={cx('label')}>
        <input
          className={cx('checkbox')}
          type="checkbox"
          checked={currentRefinement}
          onChange={this.onChange}
        />
        <span className={cx('labelText')}>{label}</span>
      </label>
    );
  }
}

export default Toggle;
