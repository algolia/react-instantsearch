import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isNaN } from 'lodash';
import translatable from '../core/translatable';
import classNames from './classNames.js';

const cx = classNames('RangeInput');

export class RawRangeInput extends Component {
  static propTypes = {
    currentRefinement: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }).isRequired,
    canRefine: PropTypes.bool.isRequired,
    translate: PropTypes.func.isRequired,
    refine: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
  };

  static contextTypes = {
    canRefine: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = this.normalizeStateForRendering(props);
  }

  componentWillMount() {
    if (this.context.canRefine) {
      this.context.canRefine(this.props.canRefine);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.canRefine) {
      this.setState(this.normalizeStateForRendering(nextProps));
    }

    if (this.context.canRefine) {
      this.context.canRefine(nextProps.canRefine);
    }
  }

  onSubmit = e => {
    e.preventDefault();

    this.props.refine({
      min: this.state.from,
      max: this.state.to,
    });
  };

  normalizeStateForRendering(props) {
    const { min: rangeMin, max: rangeMax } = props;
    const { min: valueMin, max: valueMax } = props.currentRefinement;

    return {
      from: valueMin !== undefined && valueMin !== rangeMin ? valueMin : '',
      to: valueMax !== undefined && valueMax !== rangeMax ? valueMax : '',
    };
  }

  normalizeRangeForRendering({ min, max }) {
    const hasMin = min !== undefined;
    const hasMax = max !== undefined;

    return {
      min: hasMin && hasMax ? min : '',
      max: hasMin && hasMax ? max : '',
    };
  }

  render() {
    const { from, to } = this.state;
    const { translate, canRefine } = this.props;
    const { min, max } = this.normalizeRangeForRendering(this.props);

    return (
      <form
        {...cx('root', !canRefine && 'noRefinement')}
        onSubmit={this.onSubmit}
      >
        <fieldset disabled={!canRefine} {...cx('fieldset')}>
          <label {...cx('labelMin')}>
            <input
              {...cx('inputMin')}
              type="number"
              min={min}
              max={max}
              value={from}
              placeholder={min}
              onChange={e => this.setState({ from: e.currentTarget.value })}
            />
          </label>
          <span {...cx('separator')}>{translate('separator')}</span>
          <label {...cx('labelMax')}>
            <input
              {...cx('inputMax')}
              type="number"
              min={min}
              max={max}
              value={to}
              placeholder={max}
              onChange={e => this.setState({ to: e.currentTarget.value })}
            />
          </label>
          <button {...cx('submit')} type="submit">
            {translate('submit')}
          </button>
        </fieldset>
      </form>
    );
  }
}

export default translatable({
  submit: 'ok',
  separator: 'to',
})(RawRangeInput);
