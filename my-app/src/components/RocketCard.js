import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {FacebookShareButton, RedditShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, RedditIcon, TwitterIcon, WhatsappIcon} from 'react-share';

const useStyles = theme => ({
  cardRoot: {
    maxWidth: 445,
  }
});


class RocketCard extends React.Component {
	constructor(){
        super()
		this.state = {
            loading: true,
            rocketIdData: {}
        }

        this.learnMore = this.learnMore.bind(this)

    }

    componentDidMount() {
      const id = this.props.id;
          this.setState({
            loading: false,
          })
}
    learnMore(){

    }





    render(){
        const {classes} = this.props;
        const id = this.props.id
        return (
          this.state.loading ? <h1>Loading</h1> :
          <Card className={classes.cardRoot}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="400"
                image={this.props.rocketInfo.imageurl}
                title="Contemplative Reptile"
                onClick = {(event) => window.location.href='/Rocket/' + this.props.rocketInfo.id}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.props.rocketInfo.name}
                </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {this.props.rocketInfo.missionDescription}
                  </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick = {(event) => window.location.href='/Rocket/' + this.props.rocketInfo.id}>
                Learn More
              </Button>
              <FacebookShareButton 
                quote={this.props.rocketInfo.missionDescription ? this.props.rocketInfo.missionDescription : this.props.rocketInfo.name} 
                hashtag="#Rockets"
                url = {window.location.href + '/Rocket/' + this.props.rocketInfo.id}>
                <FacebookIcon size={"2.5rem"} round = {true} borderRadius = {"9px"}/>
              </FacebookShareButton>
              <TwitterShareButton
                title = {this.props.rocketInfo.name} 
                url = {window.location.href + '/Rocket/' + this.props.rocketInfo.id}>
                <TwitterIcon size={"2.5rem"} round = {true} borderRadius = {"9px"}/>
              </TwitterShareButton>
              <RedditShareButton
                title = {this.props.rocketInfo.name} 
                url = {window.location.href + '/Rocket/' + this.props.rocketInfo.id}>
                <RedditIcon size={"2.5rem"} round = {true} borderRadius = {"9px"}/>
              </RedditShareButton>
              <WhatsappShareButton
                title = {this.props.rocketInfo.name} 
                url = {window.location.href + '/Rocket/' + this.props.rocketInfo.id}>
                <WhatsappIcon size={"2.5rem"} round = {true} borderRadius = {"9px"}/>
              </WhatsappShareButton>
            </CardActions>
          </Card>
        );

	}
}



export default withStyles(useStyles)(RocketCard)
