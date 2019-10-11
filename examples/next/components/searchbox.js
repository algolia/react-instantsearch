import React, { Component } from 'react';
import { connectSearchBox, SearchBox } from 'react-instantsearch-dom';

const updateAfter = 700;

class SearchBoxWithDebounce extends Component {
  timerId = null;

  state = {
    value: this.props.currentRefinement,
  };

  onChange = event => {
    const value = event.currentTarget.value;
    const { refine } = this.props;

    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => refine(value), updateAfter);

    this.setState(() => ({
      value,
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
