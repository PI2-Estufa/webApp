import React from 'react';

class Temperature extends React.Component {
  componentDidMount() {
    fetch('http://localhost:8000')
      .then(response => response.json())
      .then(response => {
        console.log(response);
      });
  }

  render() {
    return (
      <h1>Temperature</h1>
    );
  }
}

export default Temperature;
