import React from 'react'
import {Component} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import CircularProgress from '@material-ui/core/CircularProgress';

const key = require("../teste/teste")

class RocketMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: 900,
        height: 700,
        latitude: 0,
        longitude: 0,
        zoom: 8,
        coordinates : ""
      },
      loading: true
  };
}

  componentDidMount(){
    this.setState({
      viewport:{
      width: 1200,
      height: 700,
      latitude: this.props.mapUrl.lat,
      longitude: this.props.mapUrl.long,
      zoom: 8,
      coordinates : ""

    },
    loading: false},
    );
  }


  render() {
    // console.log(this.state.loading);
    var lat, long;
    lat = this.state.viewport.latitude;
    long = this.state.viewport.longitude;
    // console.log([lat,long])
    return (
      <div>

      {this.state.loading ? <CircularProgress /> :
        <ReactMapGL
          mapStyle = 'mapbox://styles/mapbox/outdoors-v11' // style URL"
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({viewport})}
          mapboxApiAccessToken = {key}>
          <Marker latitude={lat} longitude={long}><img src = "https://i.ibb.co/3Mp8mqp/pin.png" height = "25" width = "17"></img></Marker>
        </ReactMapGL>
      }

      </div>
             
    )
  }
}



export default RocketMap