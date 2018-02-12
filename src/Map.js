import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { speedData } from './dataProcessing.js';

export default class Map extends Component {
  constructor() {
    super();

    this.state = {
      map: null,
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

      this.setState({map: new maps.Map(node, mapConfig)}, this.createMarkers);
    } else {
      throw new Error();
    }
    // const speedMap = new this.props.google.maps.visualization.HeatmapLayer({
    //   data: speedData,
    //   radius: 20,
    // });
    // speedMap.setMap(this.map);
  }

  createMarkers = () => {
    let map = this.state.map;

    speedData.forEach(point => {
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
        <h3>is ${point.speed} mph</h3>`
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
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
