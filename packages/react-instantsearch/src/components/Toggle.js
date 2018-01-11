import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createClassNames from './createClassNames';

const cx = createClassNames('Toggle');

class Toggle extends Component {
  static propTypes = {
    currentRefinement: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  onChange = e => {
    this.props.refine(e.target.checked);
  };

  render() {
    const { currentRefinement, label, className } = this.props;

    return (
      <div className={classNames(cx(''), className)}>
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
