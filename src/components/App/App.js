import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [], 
    }
  }

  componentDidMount() {
    getUrls()
    .then(data => {
      this.setState({ urls: data.urls });
  })
}

addNewUrl = (newUrl) => {
  console.log('new', newUrl)
  postUrls(newUrl)
    .then((response) => {
      if(response.ok) {
        console.log('url posted')
        return response.json()
      } else {
        console.log('failed to post')
        throw new Error('Failed to post url')
      }
    })
    .then((data) => {
      this.setState({
        urls: [...this.state.urls, data]
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

  render() {
    console.log(this.state.urls)
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addNewUrl={this.addNewUrl}/>
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
