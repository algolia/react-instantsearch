import PropTypes from 'prop-types';
import React, { Component } from 'react';
import translatable from '../core/translatable';
import classNames from './classNames.js';
import BaseWidget from './BaseWidget';

const widgetClassName = 'RangeInput';
const cx = classNames(widgetClassName);

export class RawRangeInput extends Component {
  static propTypes = {
    canRefine: PropTypes.bool.isRequired,
    precision: PropTypes.number.isRequired,
    translate: PropTypes.func.isRequired,
    refine: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    currentRefinement: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }),
  };

  static defaultProps = {
    currentRefinement: {},
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
    // In react@16.0.0 the call to setState on the inputs trigger this lifecycle hook
    // because the context has changed (for react). I don't think that the bug is related
    // to react because I failed to reproduce it with a simple hierarchy of components.
    // The workaround here is to check the differences between previous & next props in order
    // to avoid to override current state when values are not yet refined. In the react documentation,
    // they DON'T categorically say that setState never run componentWillReceiveProps.
    // see: https://reactjs.org/docs/react-component.html#componentwillreceiveprops

    if (
      nextProps.canRefine &&
      (this.props.canRefine !== nextProps.canRefine ||
        this.props.currentRefinement.min !== nextProps.currentRefinement.min ||
        this.props.currentRefinement.max !== nextProps.currentRefinement.max)
    ) {
      this.setState(this.normalizeStateForRendering(nextProps));
    }

    if (
      this.context.canRefine &&
      this.props.canRefine !== nextProps.canRefine
    ) {
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
    const { canRefine, min: rangeMin, max: rangeMax } = props;
    const { min: valueMin, max: valueMax } = props.currentRefinement;

    return {
      from:
        canRefine && valueMin !== undefined && valueMin !== rangeMin
          ? valueMin
          : '',
      to:
        canRefine && valueMax !== undefined && valueMax !== rangeMax
          ? valueMax
          : '',
    };
  }

  normalizeRangeForRendering({ canRefine, min, max }) {
    const hasMin = min !== undefined;
    const hasMax = max !== undefined;

    return {
      min: canRefine && hasMin && hasMax ? min : '',
      max: canRefine && hasMin && hasMax ? max : '',
    };
  }

  render() {
    const { from, to } = this.state;
    const { precision, translate, canRefine } = this.props;
    const { min, max } = this.normalizeRangeForRendering(this.props);
    const step = 1 / Math.pow(10, precision);

    return (
      <BaseWidget
        widgetClassName={widgetClassName}
        otherWidgetClassNames={[!canRefine && `-noRefinement`]}
      >
        <form {...cx(['form'])} onSubmit={this.onSubmit}>
          <input
            {...cx(['input'])}
            type="number"
            min={min}
            max={max}
            value={from}
            step={step}
            placeholder={min}
            disabled={!canRefine}
            onChange={e => this.setState({ from: e.currentTarget.value })}
          />
          <span {...cx(['separator'])}>{translate('separator')}</span>
          <input
            {...cx(['input'])}
            type="number"
            min={min}
            max={max}
            value={to}
            step={step}
            placeholder={max}
            disabled={!canRefine}
            onChange={e => this.setState({ to: e.currentTarget.value })}
          />
          <button {...cx(['submit'])} type="submit">
            {translate('submit')}
          </button>
        </form>
      </BaseWidget>
    );
  }
}

export default translatable({
  submit: 'ok',
  separator: 'to',
})(RawRangeInput);
