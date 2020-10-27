import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
  root: {
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
    }
    componentDidMount() {
      const id = this.props.id;
          this.setState({
            loading: false,
          })
}




    render(){
        const {classes} = this.props;
        const id = this.props.id
        return (
          this.state.loading ? <h1>Loading</h1> :
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="400"
                image={this.props.rocketInfo.imageurl}
                title="Contemplative Reptile"
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
              <Button size="small" color="primary"  target="_blank" href = "http://www.google.com/">
                Share
              </Button>
              <Button size="small" color="primary" target="_blank" href = "http://www.google.com/">
                Learn More
              </Button>
            </CardActions>
          </Card>
        );

	}
}



export default withStyles(useStyles)(RocketCard)
