import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { searchForPoints } from './RouteDataProcessing.js';

export default class RouteMap extends Component {
  constructor() {
    super();

    this.state = {
      map: null,
      start: null,
      end: null,
      startMarker: null,
      endMarker: null,
      markers: []
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      const maps = this.props.google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const mapConfig = Object.assign({}, {
        center: {lat: 37.648916, lng: -122.248656},
        zoom: 10,
        mapTypeId: 'roadmap'
      });
      let map = new maps.Map(node, mapConfig);

      this.setState({map: map}, this.startClick);
    } else {
      throw new Error();
    }
  }

  setStartEnd = (which, location, listener) => {
    this.props.google.maps.event.removeListener(listener);

    let marker = new this.props.google.maps.Marker({
      position: location,
      map: this.state.map
    });

    if (which === 'start') {
      marker.addListener('click', this.resetStart);
      if (this.state.end === null) {
        this.setState({start: location, startMarker: marker}, this.endClick);
      } else {
        this.setState({start: location, startMarker: marker}, this.calculateRoute);
      }
    } else if (which === 'end') {
      marker.addListener('click', this.resetEnd);
      if (this.state.start === null) {
        this.setState({end: location, endMarker: marker}, this.startClick);
      } else {
        this.setState({end: location, endMarker: marker}, this.calculateRoute);
      }
    }
  }

  resetMarkers = () => {
    this.state.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.setState({markers: []});
  }

  resetStart = () => {
    this.state.startMarker.setMap(null);
    this.resetMarkers();
    if (this.state.end === null) {
      this.setState({start: null, startMarker: null});
    } else {
      this.setState({start: null, startMarker: null}, this.startClick);
    }
  }

  resetEnd = () => {
    this.state.endMarker.setMap(null);
    this.resetMarkers();
    if (this.state.start === null) {
      this.setState({end: null, endMarker: null});
    } else {
      this.setState({end: null, endMarker: null}, this.endClick);
    }
  }

  startClick = () => {
    let startListener = this.state.map.addListener('click', e => {
      this.setStartEnd('start', e.latLng, startListener);
    });
  }

  endClick = () => {
    let endListener = this.state.map.addListener('click', e => {
      this.setStartEnd('end', e.latLng, endListener);
    });
  }

  calculateRoute = () => {
    const ds = new this.props.google.maps.DirectionsService();

    const request = {
      origin: this.state.start,
      destination: this.state.end,
      travelMode: 'DRIVING'
    };

    ds.route(request, this.findPoints);
  }

  findPoints = (response) => {
    const data = searchForPoints(response);
    this.createMarkers(data);
  }

  createMarkers = (data) => {
    let map = this.state.map;
    let markers = this.state.markers;

    data.forEach(point => {
      let coloredDot = {
        path: this.props.google.maps.SymbolPath.CIRCLE,
        scale: 1,
        strokeColor: 'rgb(' + point.rgb.join(", ") + ')'
      }

      const marker = new this.props.google.maps.Marker({
        position: {lat: Number(point.lat), lng: Number(point.lng)},
        icon: coloredDot,
        map: map
      });

      const infowindow = new this.props.google.maps.InfoWindow({
        content: `<h3>Average speed</h3>
        <h4>at latitude: ${point.lat} and longitude: ${point.lng}</h4>
        <h3>is ${point.speed.toFixed(2)} mph</h3>`
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      markers.push(marker);
    });
    this.setState({markers: markers});
  }

  render() {
    const style = {
      width: '70vw',
      height: '90vh',
      border: '2px solid #494949'
    }

    return (
      <div ref="map" style={style}>
        loading...
      </div>
    )
  }
}
