import React from 'react';

export default class TextFetcher extends React.Component {
  state = {
    randomText: null,
    processing: false
  };

  fetchText = async () => {
    this.setState({ processing: true });
  };

  render() {
    const { randomText, processing } = this.state;
    return (
      <React.Fragment>
        <div>
          {!randomText && !processing && <div>Please load some text first</div>}
        </div>
        {processing && <div>Processing...</div>}
        <button onClick={this.fetchText}>Fetch random text</button>;
      </React.Fragment>
    );
  }
}
