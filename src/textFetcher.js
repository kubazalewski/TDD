import React from 'react';
import axios from 'axios';
import RandomText from './RandomText';

export default class TextFetcher extends React.Component {
  state = {
    randomText: null,
    processing: false
  };

  fetchText = async () => {
    this.setState({ processing: true });

    const {
      data: {
        value: { randomText }
      }
    } = await axios.get('http://www.randomtext.me/api/');

    this.setState({ processing: false, randomText });
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
        {randomText && !processing && <RandomText text={randomText} />}
      </React.Fragment>
    );
  }
}
