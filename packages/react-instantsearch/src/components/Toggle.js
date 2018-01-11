import PropTypes from 'prop-types';
import React, { Component } from 'react';
import createClassNames from './createClassNames';

const cx = createClassNames('Toggle');

class Toggle extends Component {
  static propTypes = {
    currentRefinement: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  };

  onChange = e => {
    this.props.refine(e.target.checked);
  };

  render() {
    const { currentRefinement, label } = this.props;

    return (
      <div className={cx('')}>
        <label className={cx('label')}>
          <input
            className={cx('checkbox')}
            type="checkbox"
            checked={currentRefinement}
            onChange={this.onChange}
          />
          <span className={cx('labelText')}>{label}</span>
        </label>
      </div>
    );
  }
}

export default Toggle;
