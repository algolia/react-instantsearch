import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from './Link';
import classNames from './classNames.js';
import translatable from '../core/translatable';

const cx = classNames('Breadcrumb');

const itemsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })
);

class Breadcrumb extends Component {
  static propTypes = {
    canRefine: PropTypes.bool.isRequired,
    createURL: PropTypes.func.isRequired,
    items: itemsPropType,
    refine: PropTypes.func.isRequired,
    rootURL: PropTypes.string,
    separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    translate: PropTypes.func.isRequired,
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
    const { canRefine, createURL, items, refine, translate } = this.props;
    const rootPath = canRefine
      ? <a
          {...cx('itemLink', 'itemLinkRoot')}
          onClick={() => (!this.props.rootURL ? refine() : null)}
          href={this.props.rootURL ? this.props.rootURL : createURL()}
        >
          <span {...cx('rootLabel')}>
            {translate('rootLabel')}
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

export default translatable({
  rootLabel: 'Home',
})(Breadcrumb);
