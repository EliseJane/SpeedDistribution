import React, { Component } from 'react';
import './styles/App.css';
import MapContainer from './MapContainer';

class App extends Component {
  render() {
    return (
      <div>
        <a href="https://comma.ai/">
          <img className='comma' src={process.env.PUBLIC_URL + '/comma.png'} alt="comma.ai" />
        </a>
        <div className='instructions'>
          <p>Thousands of trips around the Bay Area were recorded using the Chffr dashboard cam.</p>
          <p>Speeds at various points along these trips are being plotted on the map.</p>
          <p>Red is <span id='red'>slow</span>. Green is <span id='green'>fast</span>.</p>
          <p>Click on a point to see average speed at that location.</p>
        </div>
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}

export default App;
