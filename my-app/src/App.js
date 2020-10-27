import React from 'react';
import RocketCard from "./components/RocketCard"
import './App.css';

import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


class App extends React.Component {

    constructor(){
      super()
      this.state = {
        loading: true,
        page : 0,
        rocketData : {}
      }
      this.nextPageButton = this.nextPageButton.bind(this)
      this.previousPageButton = this.previousPageButton.bind(this)
    }


      componentDidMount() {
        this.setState({loading:true})
        fetch("https://space-launch-db.herokuapp.com/filter?page=" + this.state.page)
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
          fetch("https://space-launch-db.herokuapp.com/filter?page=" + (this.state.page + 1))
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
          fetch("https://space-launch-db.herokuapp.com/filter?page=" + (this.state.page -1))
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
      <div className={classes.root}>
      {
        this.state.page > 0 ?
        <Button variant="contained" color="primary" onClick = {(e)=> this.previousPageButton(e)}>
          Previous
        </Button> : <div></div>
      }
      <Button variant="contained" color="primary" onClick = {(e)=> this.nextPageButton(e)}>
        Next
      </Button>
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
