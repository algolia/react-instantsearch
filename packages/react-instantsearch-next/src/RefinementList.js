import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connectRefinementList } from 'instantsearch.js/es/connectors';
import Context from './Context';

class RefinementList extends Component {
  static propTypes = {
    attribute: PropTypes.string.isRequired,
    instance: PropTypes.object.isRequired,
  };

  state = null;

  constructor(...args) {
    super(...args);

    const { instance, attribute, ...widgetParams } = this.props;

    const refinementList = connectRefinementList(state => {
      this.setState(() => state);
    });

    instance.addWidget(
      refinementList({
        ...widgetParams,
        attributeName: attribute,
      })
    );
  }

  render() {
    if (!this.state) {
      return null;
    }

    const { items, refine } = this.state;

    return (
      <div className="ais-RefinementList">
        <ul className="ais-RefinementList-list">
          {items.map(item => (
            <li
              key={item.value}
              className={cx('ais-RefinementList-item', {
                'ais-RefinementList-item--selected': item.isRefined,
              })}
            >
              <label className="ais-RefinementList-label">
                <input
                  className="ais-RefinementList-checkbox"
                  type="checkbox"
                  value={item.value}
                  checked={item.isRefined}
                  onChange={event => refine(event.currentTarget.value)}
                />
                <span className="ais-RefinementList-labelText">
                  {item.label}
                </span>
                <span className="ais-RefinementList-count">{item.count}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default props => (
  <Context.Consumer>
    {instance => <RefinementList {...props} instance={instance} />}
  </Context.Consumer>
);
