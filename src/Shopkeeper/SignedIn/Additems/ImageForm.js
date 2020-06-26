import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import AddImage from '../../../Assets/addimage.png'
import Grid from '@material-ui/core/Grid';

const fileUpload = require('fuctbase64');

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

  // function getDataUrl(img) {
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');
  //   var img = new Image();
  //   img.onload = function () {
  //     canvas.width = 250;
  //     canvas.height = 250;
  //     ctx.drawImage(img, 0, 0);
  //   }
  //   return canvas.toDataURL('image/jpeg');
  // }
  const update = async () => {
    await setImg1(img1 => localStorage.getItem('localhost/img1'));
  }
  console.log(img1)
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
            <input type="file" name="file" accept="image/*" onChange={(event) => {
              console.log(event.target.files[0])
              fileUpload(event)
                .then((data) => {
                  //console.log("base64 :", data.base64);

                  localStorage.setItem('img1', data.base64);
                  //this.processImage(data.base64);
                })
              //const dataUrl = getDataUrl(event.target.files[0]);
              //localStorage.setItem('img1', event.target.files[0]);
              // var base64Str = localStorage.getItem('img1');
              // var path = window.location.origin+'/';
              // console.log(path)
              // var optionalObj = { 'fileName': 'img11', 'type': 'png' };
              // var imageInfo = base64ToImage(base64Str,path,optionalObj);
              // console.log(imageInfo)
              update();
              console.log(img1)
            }
            } />
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardHeader
            title="Image 2"
          />
          <CardMedia
            className={classes.media}
            image={img2}
          />
          <CardActions>
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