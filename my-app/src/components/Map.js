import React from 'react'
import {Component} from 'react';
import ReactMapGL from 'react-map-gl';

const key = require("../teste/teste")

class RocketMap extends Component {

  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: this.props.mapUrl.lat,
      longitude: this.props.mapUrl.long,
      zoom: 8,
      coordinates : ""
    }

  };


  render() {
    return (
      <ReactMapGL
        mapStyle = 'mapbox://styles/mapbox/streets-v11' // style URL"
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken = {key}
        
      />
    );
  }
}



export default RocketMap