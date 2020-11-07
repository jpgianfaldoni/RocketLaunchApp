import React from 'react'
import {Component} from 'react';
import StaticMap, { InteractiveMap, Marker } from 'react-map-gl';
import ReactMapGL from 'react-map-gl';


import CircularProgress from '@material-ui/core/CircularProgress';

const key = require("../teste/teste") || process.env.MAPKEY;

class RocketMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: 900,
        height: 700,
        latitude: 0,
        longitude: 0,
        zoom: 2,
        coordinates : ""
      },
      loading: true
  };
  this.onDragEnd = this.onDragEnd.bind(this)
}

  componentDidMount(){
    this.setState({
      viewport:{
      width: 900,
      height: 700,
      latitude: this.props.mapUrl.lat,
      longitude: this.props.mapUrl.long,
      zoom: 8,
      coordinates : ""
      
    },
    loading: false},
    );
  }

  onDragEnd = (lngLat) => {
    this.setState({ 
      longitude: lngLat.lng, 
      latitude: lngLat.lat 
    });
  };
  


  render() {
    // console.log(this.state.loading);
    var lat, long;
    lat = this.state.viewport.latitude;
    long = this.state.viewport.longitude;
    console.log(lat)
    console.log(long)
    // console.log([lat,long])
    return (
      <div>

      {this.state.loading ? <CircularProgress /> :
        <ReactMapGL
          mapStyle = 'mapbox://styles/mapbox/outdoors-v11' // style URL"
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({viewport})}
          mapboxApiAccessToken = {key}
          dragPan = {true}
          dragRotate = {false}
          doubleClickZoom = {false}
          scrollZoom= {true}>
          <Marker latitude={this.props.mapUrl.lat} longitude={this.props.mapUrl.long} anchor="bottom" onDragEnd={this.onDragEnd}><img src = "https://i.ibb.co/3Mp8mqp/pin.png" height = "35" width = "27"></img></Marker>
        </ReactMapGL>
      }

      </div>
             
    )
  }
}



export default RocketMap