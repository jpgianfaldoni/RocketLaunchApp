import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { withStyles } from "@material-ui/core/styles";
import '../style.css';

const key = require("../teste/teste")

const Style = {
      width: "600px",
      height: "500px"
  };


class RocketMap extends React.Component {
	constructor(){
        super()
		this.state = {

        }


    }
    
    componentDidMount() {

        }
    

    render(){
		return(
        <div>
            <Map style={Style} initialCenter={{
                lat: 48.85853,
                lng: 2.29456
                }}
                google={this.props.google} zoom={14}>

                <Marker onClick={this.onMarkerClick} name={'Current location'} />
            
                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{"oi"}</h1>
                    </div>
                </InfoWindow>
            </Map>
        </div>
        );

	}
}



export default GoogleApiWrapper({
    apiKey: (key)
  })(RocketMap)