import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Index from './Index';

/**
 * Creates a specialized root Index component. It accepts
 * a specification of the root Element.
 * @param {object} root - the defininition of the root of an Index sub tree.
 * @returns {object} a Index root
 */
export default function createIndex(root) {
  return class CreateIndex extends Component {
    static propTypes = {
      indexName: PropTypes.string.isRequired,
      root: PropTypes.shape({
        Root: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
          .isRequired,
        props: PropTypes.object,
      }),
      children: PropTypes.node,
    };

    static defaultProps = {
      root,
    };

    render() {
      return (
        <Index indexName={this.props.indexName} root={this.props.root}>
          {this.props.children}
        </Index>
      );
    }
  };
}
