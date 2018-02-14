import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/App.css';
import MapContainer from './MapContainer';

class RouteApp extends Component {
  render() {
    return (
      <div>
        <a href="https://comma.ai/">
          <img className='comma' src={process.env.PUBLIC_URL + '/comma.png'} alt="comma.ai" />
        </a>
        <Link className='link' to='/all'>See All Speed Data (requires patience)</Link>
        <div className='instructions'>
          <p>A thousand trips around the Bay Area were recorded using the Chffr dashboard cam.</p>
          <p>Click a start and end point to plot available speed data along your route.</p>
          <p>Red is <span id='red'>slow</span>. Green is <span id='green'>fast</span>.</p>
          <p>Click on a point to see average speed at that location.</p>
          <p>Click on markers to remove them.</p>
        </div>
        <MapContainer google={this.props.google} page='route' />
      </div>
    );
  }
}

export default RouteApp;
