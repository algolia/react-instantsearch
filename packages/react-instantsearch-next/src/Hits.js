import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectHits } from 'instantsearch.js/es/connectors';
import Context from './Context';

class Hits extends Component {
  static propTypes = {
    instance: PropTypes.object.isRequired,
    renderHit: PropTypes.func,
    children: PropTypes.func,
  };

  static defaultProps = {
    renderHit: hit => (
      <li key={hit.objectID} className="ais-Hits-item">
        {JSON.stringify(hit).slice(0, 100)}...
      </li>
    ),
    children: null,
  };

  state = null;

  constructor(...args) {
    super(...args);

    const hits = connectHits(state => {
      this.setState(() => state);
    });

    this.props.instance.addWidget(
      hits({
        escapeHits: true,
      })
    );
  }

  render() {
    if (!this.state) {
      return null;
    }

    const { renderHit, children } = this.props;
    const { hits } = this.state;

    if (children) {
      return children({ hits });
    }

    return (
      <div className="ais-Hits" style={{ marginTop: 8 }}>
        <ol className="ais-Hits-list">{hits.map(renderHit)}</ol>
      </div>
    );
  }
}

export default props => (
  <Context.Consumer>
    {instance => <Hits {...props} instance={instance} />}
  </Context.Consumer>
);
