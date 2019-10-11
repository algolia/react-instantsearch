import React, { Component } from 'react';
import { connectSearchBox, SearchBox as SearchBox } from 'react-instantsearch-dom';

class SearchBoxWithDebounce extends Component {
  timerId = null;

  state = {
    value: this.props.currentRefinement
  };

  onChange = event => {
    const value = event.currentTarget.value;
    const { refine, delay = 1000 } = this.props;

    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => refine(value), delay);

    this.setState(() => ({
      value
    }));
  };

  render() {
    const { value } = this.state;
    return (
      <SearchBox
        {...this.props}
        searchAsYouType={false}
        currentRefinement={value}
        onChange={this.onChange}
      />
    );
  }
}

export default connectSearchBox(SearchBoxWithDebounce);