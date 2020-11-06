import React from 'react'
import { withRouter } from "react-router";
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';
import '../style.css';
import CircularProgress from '@material-ui/core/CircularProgress';


import RocketMap from "./Map"


class Rocket extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      rocketID: "",
      rocketData: {}
    }
    this.mapUrlParser = this.mapUrlParser.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params[0]
    fetch("https://space-launch-db.herokuapp.com/id?id=" + id)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          rocketData: data,
        })
      })
  }
  mapUrlParser(mapUrl) {
    // Examples
    // http://maps.google.com/maps?q=28.627+N,+80.621+W
    // https://www.google.ee/maps/search/57.435833,152.337778
    if (mapUrl.includes("search")) {
      var split = mapUrl.split("/")
      var lastIndex = split.length - 1;
      var numbers = split[lastIndex].split(",")
      var lat = parseFloat(numbers[0].replace(/[+|N|S]/gi, ""))
      var long = parseFloat(numbers[1].replace(/[+|W|E]/gi, ""))
      numbers[0].includes("S") ? lat = -lat : lat = lat
      numbers[1].includes("W") ? long = -long : long = long
      return { lat: lat, long: long };
    } else if (!mapUrl.includes("place")) {
      var split1 = mapUrl.split("=");
      var coords = split1[1].split(",")
      // console.log(coords)
      var lat = parseFloat(coords[0].replace(/[+|N|S]/gi, ""))
      var long = parseFloat(coords[1].replace(/[+|W|E]/gi, ""))
      coords[0].includes("S") ? lat = -lat : lat = lat
      coords[1].includes("W") ? long = -long : long = long
      return { lat: lat, long: long };
    }
    return false;
  }

  render() {
    var date = new Date(this.state.rocketData.launchTime);
    // console.log(this.state.rocketData)
    return (
      this.state.loading ? <CircularProgress /> :
        <div className="rockettest">
          <img src={this.state.rocketData.imageurl} width="400" height="500"></img>
          <div className="rockettest2">
            <h2>Name: {this.state.rocketData.name}</h2>
            <h2>Launch Date: {date.toLocaleDateString()}</h2>
            <h2>Launch Status: {this.state.rocketData.status}</h2>
            <h2>Agency: {this.state.rocketData.agencyName}</h2>
            {this.state.rocketData.missionType ? <h2>Mission Type: {this.state.rocketData.missionType}</h2> : <h2></h2>}
            <h1>Countdown:</h1><Countdown date={date} />
            {this.mapUrlParser(this.state.rocketData.mapurl) ? <RocketMap mapUrl={this.mapUrlParser(this.state.rocketData.mapurl)} /> : <h1>teste</h1>}
          </div>
        </div>
    )

  }
}



export default withRouter(Rocket);