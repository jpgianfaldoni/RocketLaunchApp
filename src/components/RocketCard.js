import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { FacebookShareButton, RedditShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton, FacebookIcon, RedditIcon, EmailIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import ExploreIcon from '@material-ui/icons/Explore';
import '../style.css';

const useStyles = theme => ({
  cardRoot: {
    width: 445,
    height: 670,
  }
});

const YellowTextTypography = withStyles({
  root: {
    color: "#d8b20a"
  }
})(Typography);


class RocketCard extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      rocketIdData: {}
    }
  }

  componentDidMount() {
    this.setState({
      loading: false,
    })
  }


  mapUrlParser(mapUrl) {
    // Examples
    // http://maps.google.com/maps?q=28.627+N,+80.621+W
    // https://www.google.ee/maps/search/57.435833,152.337778
    // console.log(mapUrl)
    if(!mapUrl || !mapUrl.includes("google")){
      return false
    }
    else if (mapUrl.includes("search")) {
      var split = mapUrl.split("/")
      var lastIndex = split.length - 1;
      var numbers = split[lastIndex].split(",")
      var lat = parseFloat(numbers[0].replace(/[+|N|S]/gi, ""))
      var long = parseFloat(numbers[1].replace(/[+|W|E]/gi, ""))
      numbers[0].includes("S") ? lat = -lat : lat = lat
      numbers[1].includes("W") ? long = -long : long = long
      return { lat: lat, long: long };
    } else if (!mapUrl.includes("place") && !mapUrl.includes(";")) {
      var split1 = mapUrl.split("=");
      var coords = split1[1].split(",")
      // console.log(coords)
      var lat = parseFloat(coords[0].replace(/[+|N|S]/gi, ""))
      var long = parseFloat(coords[1].replace(/[+|W|E]/gi, ""))
      coords[0].includes("S") ? lat = -lat : lat = lat
      coords[1].includes("W") ? long = -long : long = long
      return { lat: lat, long: long };
    }
    return false;
  }





  render() {
    const { classes } = this.props;
    return (
      this.state.loading ? <h1>Loading</h1> :
          <Card className={classes.cardRoot}> 
              <CardActionArea height="209px">
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="400"
                  image={this.props.rocketInfo.imageurl}
                  title="Contemplative Reptile"
                  onClick={(event) => window.location.href = '/Rocket/' + this.props.rocketInfo.id}
                />
                <CardContent>
                  <YellowTextTypography  gutterBottom variant="h5" component="h2">
                    {this.props.rocketInfo.name}
                  </YellowTextTypography>
                  <Typography gutterBottom component="h6">
                    Set to Launch: {new Date(this.props.rocketInfo.launchTime).toLocaleDateString()}
                  </Typography>
                  <Typography className="cardDescription" variant="body2" color="textSecondary" component="p">
                    {this.props.rocketInfo.missionDescription}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <FacebookShareButton
                  quote={this.props.rocketInfo.missionDescription ? this.props.rocketInfo.missionDescription : this.props.rocketInfo.missionDescription}
                  hashtag="#Rockets"
                  url={window.location.href + 'Rocket/' + this.props.rocketInfo.id}>
                  <FacebookIcon size={"2.5rem"} round={true} borderRadius={"9px"} />
                </FacebookShareButton>
                <TwitterShareButton
                  title={this.props.rocketInfo.name}
                  url={window.location.href + 'Rocket/' + this.props.rocketInfo.id}>
                  <TwitterIcon size={"2.5rem"} round={true} borderRadius={"9px"} />
                </TwitterShareButton>
                <RedditShareButton
                  title={this.props.rocketInfo.name}
                  url={window.location.href + 'Rocket/' + this.props.rocketInfo.id}>
                  <RedditIcon size={"2.5rem"} round={true} borderRadius={"9px"} />
                </RedditShareButton>
                <WhatsappShareButton
                  title={this.props.rocketInfo.name}
                  url={window.location.href + 'Rocket/' + this.props.rocketInfo.id}>
                  <WhatsappIcon size={"2.5rem"} round={true} borderRadius={"9px"} />
                </WhatsappShareButton>
                <EmailShareButton
                  subject={this.props.rocketInfo.name}
                  url={window.location.href + 'Rocket/' + this.props.rocketInfo.id}>
                  <EmailIcon size={"2.5rem"} round={true} borderRadius={"9px"} />
                </EmailShareButton>
                { this.mapUrlParser(this.props.rocketInfo.mapurl) ?
                <IconButton onClick={(event)=>window.open(this.props.rocketInfo.mapurl, '_blank')}  color="secondary" aria-label="upload picture" component="span">
                  <ExploreIcon fontSize="large"/>
                </IconButton>
                : <div></div>
                }
                <div className="learnMoreButton">
                  <Button variant="outlined" size="small" onClick={(event) => window.location.href = '/Rocket/' + this.props.rocketInfo.id}>
                    Learn More
                    </Button>
                </div>
              </CardActions>
          </Card>
    );

  }
}



export default withStyles(useStyles)(RocketCard)
