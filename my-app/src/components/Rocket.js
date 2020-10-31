import React from 'react'
import { withRouter } from "react-router";
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';
import '../style.css';

import RocketMap from "./Map"


class Rocket extends React.Component {
	constructor(){
        super()
		this.state = {
            loading : true,
            rocketID : "",
            rocketData : {}
        }


    }
    
    componentDidMount() {
        const id = this.props.match.params[0]
        console.log(id)
        fetch("https://space-launch-db.herokuapp.com/id?id=" + id) 
          .then(response => response.json())
          .then(data => {
            this.setState({
              loading: false,
              rocketData : data,
            })
          })
        }
    

    render(){
        console.log(this.state.rocketData)
        var date = new Date(this.state.rocketData.launchTime); 
		return(
            <div className = "rockettest">
                <img src={this.state.rocketData.imageurl}  width="400" height="500"></img>
                <div className = "rockettest2">
                  <h2>{this.state.rocketData.name}</h2>
                  <h2>{date.toLocaleDateString()}</h2>
                  <h2>{this.state.rocketData.status}</h2>
                  <h2>{this.state.rocketData.agencyName}</h2>
                  <h2>{this.state.rocketData.missionType}</h2>
                  <Countdown date={date} />
                  <RocketMap/>
                </div>
            </div>
		)

	}
}



export default withRouter(Rocket);