import React from 'react';
import RocketCard from "./components/RocketCard"
import './App.css';

import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  buttonRoot: {
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textRoot: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  }
});


class App extends React.Component {

    constructor(){
      super()
      this.state = {
        loading: true,
        page : 0,
        rocketData : {},
        rocketName : "",
        topText: ""
      }
      this.nextPageButton = this.nextPageButton.bind(this)
      this.previousPageButton = this.previousPageButton.bind(this)
      this.handleSubmitRocketName = this.handleSubmitRocketName.bind(this)
      this.handleChange = this.handleChange.bind(this)
      
      
    }


      componentDidMount() {
        this.setState({loading:true})
        fetch("https://space-launch-db.herokuapp.com/filter?page=" + this.state.page + "&rocketName=" + this.state.rocketName)
          .then(response => response.json())
          .then(data => {
            this.setState({
              loading: false,
              rocketData : data,
            })
          })
        }


        nextPageButton(event){
          event.preventDefault()
          fetch("https://space-launch-db.herokuapp.com/filter?page=" + (this.state.page + 1) + "&rocketName=" + this.state.rocketName)
            .then(response => response.json())
            .then(data => {
              this.setState({
                loading: false,
                rocketData : data,
                page : this.state.page + 1
              })
          })
          console.log(this.state.page)
        }

        previousPageButton(event){
          event.preventDefault()
          fetch("https://space-launch-db.herokuapp.com/filter?page=" + (this.state.page -1) + "&rocketName=" + this.state.rocketName)
            .then(response => response.json())
            .then(data => {
              this.setState({
                loading: false,
                rocketData : data,
                page : this.state.page - 1
              })
          })
          console.log(this.state.page)
        }

        handleSubmitRocketName(event){
          event.preventDefault()
          fetch("https://space-launch-db.herokuapp.com/filter?page=" + this.state.page  + "&rocketName=" + this.state.rocketName)
            .then(response => response.json())
            .then(data => {
              this.setState({
                loading: false,
                rocketData : data,
                rocketName : this.state.topText
              })
            })
        }
      

        handleChange(event, state){
          const {value} = event.target
          this.setState({
            [state]: value,
          })
          console.log(this.state.topText)
        }
      


  render(){
    const {classes} = this.props;
    const elements = []
		for (let i = 0; i < this.state.rocketData.length; i++) {
        elements.push(<Grid item xs={4}><RocketCard id = {i} rocketInfo = {this.state.rocketData[i]} /></Grid>);
			}
    return(
      <div>
				{
      this.state.loading ? <h1>Loading</h1> :
      
      <div className={classes.buttonRoot}>
      {
        this.state.page > 0 ?
        <Button variant="contained" color="primary" onClick = {(e)=> this.previousPageButton(e)}>
          Previous
        </Button> : <div></div>
      }
      <Button variant="contained" color="primary" onClick = {(e)=> this.nextPageButton(e)}>
        Next
      </Button>
      <form className={classes.root} noValidate autoComplete="off" onSubmit = {(e)=> this.handleSubmitRocketName(e)}>
        <TextField id="outlined-basic" label="Rocket Name" variant="outlined" value = {this.state.topText} onChange={(e) => this.handleChange(e, "topText")}/>
      </form>
      <Grid container spacing={2}>
        {elements}
      </Grid>
      </div>
  }
      </div>
    )
  }
}

export default withStyles(useStyles)(App);
