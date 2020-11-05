import React from 'react';
import RocketCard from "./RocketCard"



import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';





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
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }
});


class MainPage extends React.Component {

  constructor() {
    super()
    this.state = {
      loading: true,
      page: 0,
      rocketData: {},
      rocketName: "",
      missionName: "",
      rocketStatus: "",
      agencies: "",
      nameList: {}
    }
    this.nextPageButton = this.nextPageButton.bind(this)
    this.previousPageButton = this.previousPageButton.bind(this)
    this.handleSubmitRocketName = this.handleSubmitRocketName.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.checkboxHandler = this.checkboxHandler.bind(this)
    
  }


  componentDidMount() {
    this.setState({ loading: true })
    fetch("https://space-launch-db.herokuapp.com/filter?page=" + this.state.page + "&rocketName=" + this.state.rocketName + "&rocketStatus=" +
      this.state.rocketStatus + "&missionName=" + this.state.missionName + "&agencies=" + this.state.agencies)
      .then(response => response.json())
      .then(data => {
        this.setState({
          rocketData: data,
        })
      })

      fetch("https://space-launch-db.herokuapp.com/listAgencyName").then(response => response.json()).then(data => {this.setState({ nameList: data, loading: false})});
  }


  nextPageButton(event) {
    event.preventDefault()
    fetch("https://space-launch-db.herokuapp.com/filter?page=" + (this.state.page + 1) + "&rocketName=" + this.state.rocketName +
      "&rocketStatus=" + this.state.rocketStatus + "&missionName=" + this.state.missionName + "&agencies=" + this.state.agencies)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          rocketData: data,
          page: this.state.page + 1
        })
      })
  }

  previousPageButton(event) {
    event.preventDefault()
    fetch("https://space-launch-db.herokuapp.com/filter?page=" + (this.state.page - 1) + "&rocketName=" + this.state.rocketName +
      "&rocketStatus=" + this.state.rocketStatus + "&missionName=" + this.state.missionName + "&agencies=" + this.state.agencies)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          rocketData: data,
          page: this.state.page - 1
        })
      })
  }

  handleSubmitRocketName(event) {
    event.preventDefault()
    fetch("https://space-launch-db.herokuapp.com/filter?page=" + this.state.page + "&rocketName=" + this.state.rocketName +
      "&rocketStatus=" + this.state.rocketStatus + "&missionName=" + this.state.missionName + "&agencies=" + this.state.agencies)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          rocketData: data,
        })
      })
  }


  handleChange(event, state) {
    const { value } = event.target
    this.setState({
      [state]: value,
    })
  }

  checkboxHandler(event) {
    var selValue = event.target.value;
    var currState = this.state.agencies;
    var currStateList = currState.split(",");
    if(currState.length == 0){
      this.setState({agencies: selValue});
    } else if(currStateList.includes(selValue)) {
      var index = currStateList.indexOf(selValue);
      currStateList.splice(index, 1);
      var newState = currStateList[0];
      for (let i = 1; i<currStateList.length; i++){
        newState += "," + currStateList[i];
      }
      if (!newState) {this.setState({agencies: ""});} else {this.setState({agencies: newState});}
    } else {
      this.setState({agencies: currState + "," + selValue});

    }
    
  }



  render() {
    const { classes } = this.props;
    const rocketElements = [];
    const checkboxLines = [];
    for (let i = 0; i < this.state.rocketData.length; i++) {
      rocketElements.push(<Grid item xs={'auto'}><RocketCard id={i} rocketInfo={this.state.rocketData[i]} /></Grid>);
    }

    if (!this.state.loading){
      var agencyList = this.state.nameList.agencies.sort();
      for (let i = 0; i < agencyList.length; i++) {
        checkboxLines.push(
        <div class="singleCheckbox">
          <FormControlLabel 
            control={<Checkbox value={agencyList[i]} onChange={this.checkboxHandler}/>} 
            label={agencyList[i]}/>
        </div>
          );
      }
    }

    return (
      <div>
        {
        this.state.loading ? <CircularProgress /> :
          <div className = "mainPageDiv">
            <div className = "rocketCardsDiv">
              <div className={classes.buttonRoot}>
                {

                  this.state.page > 0 ?
                    <Button variant="contained" color="primary" onClick={(e) => this.previousPageButton(e)}>
                      Previous
                    </Button> : <div></div>
                          }
                          <Button variant="contained" color="primary" onClick={(e) => this.nextPageButton(e)}>
                            Next
                    </Button>
                          <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => this.handleSubmitRocketName(e)}>
                            <TextField id="outlined-basic" label="Rocket Name" variant="outlined" value={this.state.rocketName} onChange={(e) => this.handleChange(e, "rocketName")} />
                            <Button variant="contained" color="primary" type="Submit">
                              Submit
                    </Button>
                          </form>
                    <Grid container spacing={2}>
                      {rocketElements}
                    </Grid>
                  </div>
                </div>
                  <div className = "checkboxDiv">
                    <h2>Filter by agency:</h2>
                    {checkboxLines}
                  </div>
           </div>   
        }
      </div>
    )
  }
}

export default withStyles(useStyles)(MainPage);