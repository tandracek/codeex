import React, { Component } from 'react';
import MainContainer from './components/Main';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Filter Code Exercise</h2>
        </div>
        <div className="App-main">
          <MainContainer />
        </div>
      </div>
    );
  }
}

export default App;
