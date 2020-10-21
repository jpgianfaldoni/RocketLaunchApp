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
    maxWidth: 345,
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
        const {classes} = this.props;
        const id = this.props.id
        return (
          this.state.loading ? <h1>Loading</h1> :
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={this.state.rocketIdData.launches[0].rocket.imageURL}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.props.rocketInfo.launches[id].name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        );

	}
}



export default withStyles(useStyles)(RocketCard)
