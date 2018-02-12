import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import Map from './Map';

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

    return (
      <div className='map'>
        <Map google={this.props.google} />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo',
//  libraries: ['visualization']
}) (MapContainer)
