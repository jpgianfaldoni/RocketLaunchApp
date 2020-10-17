import React from 'react'



class Foguete extends React.Component {
	constructor(){
        super()
		this.state = {
            loading: true,
            rocketIdData: {}
        }
    }
    componentDidMount() {
        const id = this.props.id
        console.log(this.props.rocketInfo.launches[id].id);
        fetch("https://launchlibrary.net/1.4/launch/" + this.props.rocketInfo.launches[id].id)
          .then(response => response.json())
          .then(data => {
            this.setState({
              loading: false,
              rocketIdData : data,
            })
          })
	}

    render(){
        const id = this.props.id
		return(
            <div>
            {
            this.state.loading ? <h1>Loading</h1> :
            <div>
                <h1>ID:{this.props.rocketInfo.launches[id].id}</h1>
                <h1>Nome:{this.props.rocketInfo.launches[id].name}</h1>
                <h1>WindowStart:{this.props.rocketInfo.launches[id].windowstart}</h1>
                <h1>WindowEnd:{this.props.rocketInfo.launches[id].windowend}</h1>
                <img src = {this.state.rocketIdData.launches[0].rocket.imageURL} width="300" height="400"></img>
            </div>
            }
            </div>
		)

	}
}



export default Foguete;