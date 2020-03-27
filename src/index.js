import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const ENDPOINT =
  'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class App extends React.Component {
  state = {
    quotes: [
      {
        quote: 'Patience is a virtue.',
        author: 'Unknown'
      }
    ],
    index: 0
  };

  componentDidMount() {
    fetch(ENDPOINT)
      .then(res => res.json())
      .then(res => {
        this.setState(
          {
            quotes: res.quotes
          },
          this.getRandomIndex
        );
      });
  }

  getRandomIndex = () => {
    const { quotes } = this.state;

    if (quotes.length > 0) {
      const INDEX = Math.floor(Math.random() * quotes.length);
      this.setState({
        index: INDEX
      });
    }
  };

  render() {
    const { quotes, index } = this.state;

    const quote = quotes[index];

    const tweetURL = `https://twitter.com/intent/tweet/?text=${quote.quote} - ${quote.author}`;

    return (
      <div id="wrapper">
        <h1>Random Quote Generator</h1>
        <div id="quote-box">
          {quote && (
            <div>
              <div className="quote-text">
                <i className="fa fa-quote-left"> </i>
                <span id="text"> {quote.quote} </span>
              </div>
              <div className="quote-author">
                - <span id="author"> {quote.author} </span>
              </div>
            </div>
          )}
          <div className="buttons">
            <a
              className="button"
              id="tweet-quote"
              title="Tweet this quote!"
              target="_blank"
              rel="noopener noreferrer"
              href={tweetURL}
            >
              <i className="fa fa-twitter"></i>
            </a>
            {/* <a
              className="button"
              id="tumblr-quote"
              title="Post this quote on tumblr!"
              target="_blank"
              href="/"
            >
              <i className="fa fa-tumblr"></i>
            </a> */}
            <button
              className="button"
              id="new-quote"
              onClick={this.getRandomIndex}
            >
              New quote
            </button>
          </div>
        </div>
        <div className="footer">
          {' '}
          created using React by{' '}
          <a href="https://codepen.io/codepirate/">
            <u>Joyson Gaurea</u>
          </a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
