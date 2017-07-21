import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from './Link';
import classNames from './classNames.js';

const cx = classNames('Breadcrumb');

const itemsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
  })
);

class Breadcrumb extends Component {
  static propTypes = {
    refine: PropTypes.func.isRequired,
    createURL: PropTypes.func.isRequired,
    separator: PropTypes.string,
    canRefine: PropTypes.bool.isRequired,
    items: itemsPropType,
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
    //console.log('separator', this.props.separator);
    const { createURL, refine, items, canRefine } = this.props;
    const breadcrumb = items.map((item, idx) => {
      const separator = idx === items.length - 1 ? '' : this.props.separator;
      return (
        <Link
          {...cx('itemLink')}
          onClick={() => refine(item.value)}
          href={createURL(item.value)}
          key={idx}
        >
          <span {...cx('itemLabel')}>
            {item.label}
          </span>
          {separator}
        </Link>
      );
    });

    return (
      <div {...cx('root', !canRefine && 'noRefinement')}>
        {breadcrumb}
      </div>
    );
  }
}

export default Breadcrumb;
