import React from 'react';

let interval = null;

class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatures: []
    }

    this.fetchTemperature = this.fetchTemperature.bind(this);
  }

  componentDidMount() {
    this.fetchTemperature(this);
    interval = setInterval(this.fetchTemperature,2000);
  }

  fetchTemperature() {
    fetch('http://localhost:8000')
      .then(response => response.json())
      .then(response => {
        this.setState({ temperatures: response.temperatures });
      });
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Temperatura Ambiente</h1>
        <span className="temperature-value">
          {this.state.temperatures[this.state.temperatures.length - 1]}
        </span>
      </div>
    );
  }
}

export default Temperature;
