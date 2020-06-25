import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import AddImage from '../../../Assets/addimage.png'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    margin: 15
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    paddingRight: '0'
  },
}));

export default function PaymentForm() {
  const classes = useStyles();
  const [img1, setImg1] = React.useState(AddImage);
  const [img2, setImg2] = React.useState(AddImage);
  const [img3, setImg3] = React.useState(AddImage);
  const [img4, setImg4] = React.useState(AddImage);
  const [img5, setImg5] = React.useState(AddImage);

  return (
    <React.Fragment>
      <Grid container>
        <Card className={classes.root}>
          <CardHeader
            title="Image 1"
          />
          <CardMedia
            className={classes.media}
            image={img1}
          />
          <CardActions>
            {/* <Button size="small" color="primary">
              Add
        </Button> */}
            <input type="file" name="file" onChange={(event) => {
              console.log(event.target.files[0])
              setImg1(event.target.files[0]);
              console.log(img1)
            }} />
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardHeader
            title="Image 2"
          />
          <CardMedia
            className={classes.media}
            image={img2}
            title="Paella dish"
          />
          <CardActions>
            {/* <input #file type="file" accept="image/*" (change)="upload(file.files)">
            <Button #upload (click)="file.click()" size="small" color="primary" >
              Add
        </Button> */}
            <input type="file" name="file" />
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardHeader
            title="Image 3"
          />
          <CardMedia
            className={classes.media}
            image={img3}
            title="Paella dish"
          />
          <CardActions>
            {/* <Button size="small" color="primary">
              Add
        </Button> */}
            <input type="file" name="file" />
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardHeader
            title="Image 4"
          />
          <CardMedia
            className={classes.media}
            image={img4}
            title="Paella dish"
          />
          <CardActions>
            {/* <Button size="small" color="primary">
            
              Add
        </Button> */}
            <input type="file" name="file" />
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardHeader
            title="Image 5"
          />
          <CardMedia
            className={classes.media}
            image={img5}
            title="Paella dish"
          />
          <CardActions>
            {/* <Button size="small" color="primary">
              Add
        </Button> */}
            <input type="file" name="file" />
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment >
  );
}