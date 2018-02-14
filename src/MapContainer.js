import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import SpeedMap from './SpeedMap';
import RouteMap from './RouteMap';

export class MapContainer extends Component {
  render() {
    if (!this.props.loaded) {
      return (
        <div className='loading'>
          <p>Processing data....</p>
          <p>Preparing map....</p>
        </div>
      )
    }

    if (this.props.page === 'route') {
      return (
        <div className='map'>
          <RouteMap google={this.props.google} />
        </div>
      )
    } else if (this.props.page === 'speed') {
      return (
        <div className='map'>
          <SpeedMap google={this.props.google} />
        </div>
      )
    }
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo',
}) (MapContainer)
