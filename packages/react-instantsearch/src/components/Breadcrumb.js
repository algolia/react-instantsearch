import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { pick } from 'lodash';
import translatable from '../core/translatable';
import List from './List';
import Link from './Link';
import classNames from './classNames.js';

const cx = classNames('Breadcrumb');

class Breadcrumb extends Component {
  render() {
    console.log('props', this.props);
    console.log('Current Refinement', this.props.currentRefinement);
    return <div>{this.props.currentRefinement}</div>;
  }
}

export default Breadcrumb;
