import React from 'react'
import { withRouter } from "react-router";
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';
import '../style.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';




import RocketMap from "./Map"
import { Typography } from '@material-ui/core';


class Rocket extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      rocketID: "",
      rocketData: {},
      darkState: true,
    }
    this.mapUrlParser = this.mapUrlParser.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.clockRenderer = this.clockRenderer.bind(this);
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
    if(!mapUrl){
      return false
    }
    else if (mapUrl.includes("search")) {
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

  handleThemeChange(event){
    this.setState({      
      darkState : !this.state.darkState
    })
  }

  clockRenderer({days, hours, minutes, seconds, completed}) {
    console.log({days, hours, minutes, seconds})
    return(
      <Box>
        {days != 0 ? 
        <Typography variant = "h4"> Launch in: {days} days, {hours} hours, {minutes} minutes and {seconds} seconds</Typography>
        : <Typography variant = "h4">Launch in: {hours} hours, {minutes} minutes and {seconds} seconds</Typography>
        }
      </Box> 
    )
  }


  render() {

    const palletType = this.state.darkState ? "dark" : "light";
    const darkTheme = createMuiTheme({
      palette: {
        type: palletType,
      },
    });
    
    var date = new Date(this.state.rocketData.launchTime);
    var isFuture = date > new Date(); 
    console.log(this.state.rocketData)
    console.log(this.state.rocketData.missionDescription);
    return (
      <div>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      {this.state.loading ? <CircularProgress /> :
      <Box id = "Black" display = "flex" flexDirection = "column" maxWidth = '100vw' maxHeight = '100vh' position = "absolute" paddingLeft = "2vw">
        <Box id = "Red" display = "flex" flexDirection = "row">
            <IconButton aria-label="home" onClick={(e) => window.location.href = "/"}>
              <HomeIcon style={{ fontSize: 40 }}/>
            </IconButton>
            <IconButton aria-label="brightness" onClick = {this.handleThemeChange}>
              <Brightness4Icon style={{ fontSize: 40 }}/>
            </IconButton>
            <h1>{this.state.rocketData.name}</h1>
        </Box>
        <Box id = "Brown" display = "flex" flexDirection = "row" >
          <Box id = "Blue" display = "flex" flexDirection = "column" marginRight = "5vw">
            <Box id = "Orange">
              <img src={this.state.rocketData.imageurl} width="450" height="500"></img>
            </Box>
            <Box id = "Purple" display = "flex" flexDirection = "column" maxWidth = "450px">
              <h4>Mission led by: {this.state.rocketData.agencyName}</h4>
              <h4>{isFuture ? "This mission will launch on " + date.toLocaleDateString() : "This mission has launched on " + date.toLocaleDateString()}</h4>

              {this.state.rocketData.missionDescription != null ? <p>{this.state.rocketData.missionDescription}</p> : <p>Sorry, this mission's description is unavailable...</p>}

    
              <h4>{this.state.rocketData.padName ? "Launch Location: " + this.state.rocketData.padName : <div></div>}</h4>
            </Box>
          </Box>
          <Box id = "Green" maxHeight = '100%' maxHeight = '100%' >
            {this.mapUrlParser(this.state.rocketData.mapurl) ? <RocketMap mapUrl={this.mapUrlParser(this.state.rocketData.mapurl)} /> : <p>Sorry, no map was available for this launch...</p>}  
          </Box>
        </Box>
        <Box id = "Pink" textAlign = "center">
          {isFuture ? <Countdown date={date} renderer={this.clockRenderer} />: <div></div>}
        </Box>
      </Box>      
      }
    
      </ThemeProvider>
      </div>
    )
  }
}



export default withRouter(Rocket);