import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from './Link';
import classNames from './classNames.js';

const cx = classNames('Breadcrumb');

const itemsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })
);

class Breadcrumb extends Component {
  static propTypes = {
    refine: PropTypes.func.isRequired,
    createURL: PropTypes.func.isRequired,
    separator: PropTypes.string,
    canRefine: PropTypes.bool.isRequired,
    items: itemsPropType,
    rootURL: PropTypes.string,
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
    const rootPath = canRefine
      ? <a
          {...cx('itemLink')}
          onClick={() => (!this.props.rootURL ? refine() : null)}
          href={this.props.rootURL ? this.props.rootURL : createURL()}
        >
          <span {...cx('itemLabel')}>
            Home
          </span>
          {this.props.separator}
        </a>
      : null;

    const breadcrumb = items.map((item, idx) => {
      const isLast = idx === items.length - 1;
      const separator = isLast ? '' : this.props.separator;
      return !isLast
        ? <Link
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
        : <div {...cx('itemLink', 'itemDisabled')} key={idx}>
            <span {...cx('itemLabel')}>
              {item.label}
            </span>
          </div>;
    });

    return (
      <div {...cx('root', !canRefine && 'noRefinement')}>
        {rootPath}
        {breadcrumb}
      </div>
    );
  }
}

export default Breadcrumb;
