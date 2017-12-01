import PropTypes from 'prop-types';
import React, { Component } from 'react';

import translatable from '../core/translatable';
import classNames from './classNames.js';
import BaseWidget from './BaseWidget';

const widgetClassName = 'CurrentRefinements';
const cx = classNames(widgetClassName);

class CurrentRefinements extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
      })
    ).isRequired,
    refine: PropTypes.func.isRequired,
    canRefine: PropTypes.bool.isRequired,
    transformItems: PropTypes.func,
  };

  static contextTypes = {
    canRefine: PropTypes.func,
  };

  componentWillMount() {
    if (this.context.canRefine) this.context.canRefine(this.props.canRefine);
  }

  componentWillReceiveProps(props) {
    if (this.context.canRefine) this.context.canRefine(props.canRefine);
  }

  render() {
    const { translate, items, refine, canRefine, header, footer } = this.props;

    return (
      <BaseWidget
        widgetClassName={widgetClassName}
        otherWidgetClassNames={[!canRefine && `-noRefinement`]}
        header={header}
        footer={footer}
      >
        <ul {...cx(['list'])}>
          {items.map(
            item =>
              item.items
                ? item.items.map(nestedItem => (
                    <li key={nestedItem.label} {...cx(['item'])}>
                      <button
                        {...cx(['button'])}
                        onClick={() => refine(nestedItem.value)}
                      >
                        <span {...cx(['label'])}>{nestedItem.label}</span>
                        <span {...cx(['delete'])}>
                          {translate('clearFilter', nestedItem)}
                        </span>
                      </button>
                    </li>
                  ))
                : null
          )}
        </ul>
      </BaseWidget>
    );
  }
}

export default translatable({
  clearFilter: '✕',
})(CurrentRefinements);
