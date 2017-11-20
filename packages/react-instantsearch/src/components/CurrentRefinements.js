import PropTypes from 'prop-types';
import React, { Component } from 'react';

import translatable from '../core/translatable';
import { classNamesNew } from './classNames.js';
import BaseWidget from './BaseWidget';

const widgetClassName = 'CurrentRefinements';
const cx = classNamesNew(widgetClassName);

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
    const { translate, items, refine, canRefine } = this.props;

    return (
      <BaseWidget
        widgetClassName={widgetClassName}
        otherWidgetClassNames={[!canRefine && `-noRefinement`]}
      >
        <ul {...cx(['list'])}>
          {items.map(item => (
            <li key={item.label} {...cx(['item'])}>
              <span {...cx(['label'])}>{item.label}</span>
              {item.items ? (
                item.items.map(nestedItem => [
                  <span key={nestedItem.label} {...cx(['label'])}>
                    {nestedItem.label}
                  </span>,
                  <button
                    key={`${nestedItem.label}-delete`}
                    {...cx(['delete'])}
                    onClick={refine.bind(null, nestedItem.value)}
                  >
                    {translate('clearFilter', nestedItem)}
                  </button>,
                ])
              ) : (
                <button
                  {...cx(['delete'])}
                  onClick={refine.bind(null, item.value)}
                >
                  {translate('clearFilter', nestedItem)}
                </button>
              )}
            </li>
          ))}
        </ul>
      </BaseWidget>
    );
  }
}

export default translatable({
  clearFilter: '✕',
})(CurrentRefinements);
