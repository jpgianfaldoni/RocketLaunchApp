import React from 'react';
import Foguete from "./components/Foguete"
import RocketCard from "./components/RocketCard"
import logo from './logo.svg';
import './App.css';



class App extends React.Component {

    constructor(){
      super()
      this.state = {
        loading: true,
        rocketData : {}
      }
    }


      componentDidMount() {
        this.setState({loading:true})
        fetch("https://launchlibrary.net/1.4/launch/next/20")
          .then(response => response.json())
          .then(data => {
            this.setState({
              loading: false,
              rocketData : data,
            })
          })
        }
      


  render(){
    const elements = []
		var i
		for (i = 0; i < 11; i++) {
  			elements.push(<RocketCard id = {i} rocketInfo = {this.state.rocketData} />);
			}
    return(
      <div>
				{
      this.state.loading ? <h1>Loading</h1> :
      <div className="App">
      {elements}
      </div>
  }
      </div>
    )
  }
}

export default App;
