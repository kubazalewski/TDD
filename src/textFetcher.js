import React from 'react';

export default class TextFetcher extends React.Component {
  state = {
    randomText: null
  };

  render() {
    const { randomText } = this.state;
    return <div>{!randomText && <div>Please load some text first</div>}</div>;
  }
}
