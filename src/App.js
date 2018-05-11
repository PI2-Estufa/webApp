import React, { Component } from 'react';
import Temperature from './Components/Temperature';

class App extends Component {
  render() {
    return (
      <div>
        <h1>GreenHouse</h1>
        <Temperature />
      </div>
    );
  }
}

export default App;
