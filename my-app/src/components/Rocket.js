import React from 'react'
import { withRouter } from "react-router";
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';


class Rocket extends React.Component {
	constructor(){
        super()
		this.state = {
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
        var elapsed = date.getTime();
        var delta = calcTimeDelta(date)
        console.log(date)
        console.log(elapsed)
        console.log(delta)
		return(
            <div>
                <h1>{this.state.rocketData.name}</h1>
                <h1>{date.toLocaleDateString()}</h1>
                <h1>{this.state.rocketData.status}</h1>
                <h1>{this.state.rocketData.agencyName}</h1>
                <h1>{this.state.rocketData.missionType}</h1>
                <img src={this.state.rocketData.imageurl}  width="500" height="600"></img>
                <h1><Countdown date={date} /></h1>
            </div>
		)

	}
}



export default withRouter(Rocket);