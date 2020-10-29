import React from 'react'
import { withRouter } from "react-router";



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
		return(
            <div>
                <h1>{this.state.rocketData.name}</h1>
            </div>
		)

	}
}



export default withRouter(Rocket);