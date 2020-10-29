import React from 'react';
import RocketCard from "./components/RocketCard"
import MainPage from "./components/MainPage"
import Rocket from "./components/Rocket"
import Routes from "./routes"
import './App.css';



class App extends React.Component {



  render(){
	
    return(
      <div>
        <Routes/>
      </div>
    )
  }
}

export default (App);
