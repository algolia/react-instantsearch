import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectHits } from 'instantsearch.js/es/connectors';
import Context from './Context';

class Hits extends Component {
  static propTypes = {
    instance: PropTypes.object.isRequired,
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

    const { hits } = this.state;

    return (
      <div className="ais-Hits" style={{ marginTop: 8 }}>
        <ol className="ais-Hits-list">
          {hits.map(hit => (
            <li key={hit.objectID} className="ais-Hits-item">
              <p>objectID: {hit.objectID}</p>
              <p>name: {hit.name}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default props => (
  <Context.Consumer>
    {instance => <Hits {...props} instance={instance} />}
  </Context.Consumer>
);
