import React, { Component } from 'react';
import MainContainer from './components/Main';
import './css/skeleton.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h4>NFL Arrest Search</h4>
        </div>
        <div className="App-main">
          <MainContainer />
        </div>
      </div>
    );
  }
}

export default App;
