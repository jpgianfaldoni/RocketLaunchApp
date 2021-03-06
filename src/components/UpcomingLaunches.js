import React from 'react';
import RocketCard from "./RocketCard"



import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import HomeIcon from '@material-ui/icons/Home';
import Box from '@material-ui/core/Box';
import Typography from 'material-ui/styles/typography';





const useStyles = theme => ({
  root: {
    flexGrow: 0,
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
    }
  },
  form: {
    display: 'flex',
    paddingTop: 0
  }
});




class UpcomingLaunches extends React.Component {

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
      nameList: {},
      darkState: true
    }
    this.nextPageButton = this.nextPageButton.bind(this)
    this.previousPageButton = this.previousPageButton.bind(this)
    this.handleSubmitRocketName = this.handleSubmitRocketName.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.checkboxHandler = this.checkboxHandler.bind(this)
    this.handleThemeChange = this.handleThemeChange.bind(this)

  }

  


  componentDidMount() {
    this.setState({ loading: true })
    fetch("https://space-launch-db.herokuapp.com/upcoming?page=" + this.state.page + "&rocketName=" + this.state.rocketName + "&rocketStatus=" +
      this.state.rocketStatus + "&missionName=" + this.state.missionName + "&agencies=" + this.state.agencies)
      .then(response => response.json())
      .then(data => {
        this.setState({
          rocketData: data,
        })
      })

    fetch("https://space-launch-db.herokuapp.com/listAgencyName").then(response => response.json()).then(data => { this.setState({ nameList: data, loading: false }) });
  }


  nextPageButton(event) {
    event.preventDefault()
    fetch("https://space-launch-db.herokuapp.com/upcoming?page=" + (this.state.page + 1) + "&rocketName=" + this.state.rocketName +
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
    fetch("https://space-launch-db.herokuapp.com/upcoming?page=" + (this.state.page - 1) + "&rocketName=" + this.state.rocketName +
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
    fetch("https://space-launch-db.herokuapp.com/upcoming?page=" + this.state.page + "&rocketName=" + this.state.rocketName +
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

  checkboxHandler(event, state) {
    var selValue = event.target.value;
    var currState = this.state.agencies;
    var currStateList = currState.split(",");
    if(currState.length == 0){
      this.setState({
        [state]: selValue,
      }, () => {fetch("https://space-launch-db.herokuapp.com/upcoming?page=" + this.state.page + "&rocketName=" + this.state.rocketName +
      "&rocketStatus=" + this.state.rocketStatus + "&missionName=" + this.state.missionName + "&agencies=" + this.state.agencies)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          rocketData: data,
        })
      })});
    } else if(currStateList.includes(selValue)) {
      var index = currStateList.indexOf(selValue);
      currStateList.splice(index, 1);
      var newState = currStateList[0];
      for (let i = 1; i<currStateList.length; i++){
        newState += "," + currStateList[i];

      }
      if (!newState) {this.setState({[state]: ""}, () => {fetch("https://space-launch-db.herokuapp.com/upcoming?page=" + this.state.page + "&rocketName=" + this.state.rocketName +
      "&rocketStatus=" + this.state.rocketStatus + "&missionName=" + this.state.missionName + "&agencies=" + this.state.agencies)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          rocketData: data,
        })
      })});} 
      else {this.setState({[state]: newState}, () => {fetch("https://space-launch-db.herokuapp.com/upcoming?page=" + this.state.page + "&rocketName=" + this.state.rocketName +
      "&rocketStatus=" + this.state.rocketStatus + "&missionName=" + this.state.missionName + "&agencies=" + this.state.agencies)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          rocketData: data,
        })
      })});}
    } else {
      this.setState({[state]: currState + "," + selValue},() => {fetch("https://space-launch-db.herokuapp.com/upcoming?page=" + this.state.page + "&rocketName=" + this.state.rocketName +
      "&rocketStatus=" + this.state.rocketStatus + "&missionName=" + this.state.missionName + "&agencies=" + this.state.agencies)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          rocketData: data,
        })
      })});

    }
  }

  handleThemeChange() {
    this.setState({
      darkState: !this.state.darkState
    })
  }



  render() {
    const { classes } = this.props;
    const rocketElements = [];
    const checkboxLines = [];
    const palletType = this.state.darkState ? "dark" : "light";

    const darkTheme = createMuiTheme({
      palette: {
        type: palletType,
      },
    });
    for (let i = 0; i < this.state.rocketData.length; i++) {
      rocketElements.push(<Grid item xs={'auto'}><RocketCard id={i} rocketInfo={this.state.rocketData[i]} /></Grid>);
    }

    if (!this.state.loading) {
      var agencyList = this.state.nameList.agencies.sort();
      for (let i = 0; i < agencyList.length; i++) {
        checkboxLines.push(
          <div className="singleCheckbox">
            <FormControlLabel
              control={<Checkbox value={agencyList[i]} onChange={(e) => this.checkboxHandler(e, "agencies")} />}
              label={agencyList[i]} />
          </div>
        );
      }
    }

    return (
      <div>
        {
          this.state.loading ? <Box className="loading"><CircularProgress /></Box> :
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <Box display="flex">
                <div className="rocketCardsDiv">
                  <div className={classes.buttonRoot}>
                  <Box display="flex" flexDirection="row nowrap" p="0 1rem">
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={(e) => this.handleSubmitRocketName(e)}>
                      <IconButton aria-label="home" onClick={(e) => window.location.href = "/"}>
                        <HomeIcon style={{ fontSize: 40 }} />
                      </IconButton>
                      <Box paddingLeft="1rem">
                        <TextField label="Rocket Name" variant="outlined" value={this.state.rocketName} onChange={(e) => this.handleChange(e, "rocketName")} />
                      </Box>
                      <Box paddingLeft="1rem">
                        <TextField label="Mission Name" variant="outlined" value={this.state.missionName} onChange={(e) => this.handleChange(e, "missionName")} />
                      </Box>
                      <IconButton aria-label="search" type="Submit">
                        <SearchIcon style={{ fontSize: 40 }} />
                      </IconButton>
                    </form>
                    {
                      this.state.page > 0 ?
                      <IconButton aria-label="before" onClick={(e) => this.previousPageButton(e)}>
                        <NavigateBeforeIcon style={{ fontSize: 40 }}/>
                      </IconButton>
                      : <div></div>
                    }
                    <IconButton aria-label="next" onClick={(e) => this.nextPageButton(e)}>
                        <NavigateNextIcon style={{ fontSize: 40 }}/>
                    </IconButton>
                    <IconButton aria-label="brightness" onClick = {this.handleThemeChange}>
                        <Brightness4Icon style={{ fontSize: 40 }}/>
                    </IconButton>
                  </Box>
                  {
                    this.state.rocketData.length === 0 ? <Box><Typography>Sorry, we could not find any launches for the parameters you provided, please try again.</Typography></Box>:
                    <Grid container spacing={2}>
                      {rocketElements}
                    </Grid>
                  }
                  </div>
                </div>
                <div className="checkboxDiv">
                  <h2>Filter by agency:</h2>
                  {checkboxLines}
                </div>
              </Box>
            </ThemeProvider>
        }
      </div>
    )
  }
}

export default withStyles(useStyles)(UpcomingLaunches);