import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const RefinementList = ({ items, refine }) => (
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
            <span className="ais-RefinementList-labelText">{item.label}</span>
            <span className="ais-RefinementList-count">{item.count}</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

RefinementList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object.isRequired),
  refine: PropTypes.func.isRequired,
};

export default RefinementList;
