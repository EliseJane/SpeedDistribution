import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/App.css';
import MapContainer from './MapContainer';

class SpeedApp extends Component {
  render() {
    return (
      <div>
        <a href="https://comma.ai/">
          <img className='comma' src={process.env.PUBLIC_URL + '/comma.png'} alt="comma.ai" />
        </a>
        <Link className='link' to='/'>Pick Your Route</Link>
        <div className='instructions'>
          <p>A thousand trips around the Bay Area were recorded using the Chffr dashboard cam.</p>
          <p>Average speeds at various points along these trips are being plotted on the map.</p>
          <p>Red is <span id='red'>slow</span>. Green is <span id='green'>fast</span>.</p>
          <p>Click on a point to see average speed at that location.</p>
        </div>
        <MapContainer google={this.props.google} page='speed' />
      </div>
    );
  }
}

export default SpeedApp;
