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

  React.useEffect(() => {
    if (localStorage.getItem('img1') != null)
      setImg1('data:image/png;base64,' + localStorage.getItem('img1'));
    if (localStorage.getItem('img2') != null)
      setImg2('data:image/png;base64,' + localStorage.getItem('img2'));
    if (localStorage.getItem('img3') != null)
      setImg3('data:image/png;base64,' + localStorage.getItem('img3'));
    if (localStorage.getItem('img4') != null)
      setImg4('data:image/png;base64,' + localStorage.getItem('img4'));
    if (localStorage.getItem('img5') != null)
      setImg5('data:image/png;base64,' + localStorage.getItem('img5'));

  }, [img1, img2, img3, img4, img5]);

  return (
    <React.Fragment>
      <Grid container>

        <Card className={classes.root}>
          <CardHeader
            title="Image 1"
          />
          <CardMedia
            id="img1"
            className={classes.media}
            image={img1}
          />
          <CardActions>
            <input type="file" name="file" accept="image/*" onChange={(event) => {
              console.log(event.target.files[0])
              fileUpload(event)
                .then((data) => {
                  localStorage.setItem('img1', data.base64);
                })
              setImg1(localStorage.getItem('img1'));
            }
            } />
          </CardActions>
        </Card>

        <Card className={classes.root}>
          <CardHeader
            title="Image 2"
          />
          <CardMedia
            id="img2"
            className={classes.media}
            image={img2}
          />
          <CardActions>
            <input type="file" name="file" accept="image/*" onChange={(event) => {
              console.log(event.target.files[0])
              fileUpload(event)
                .then((data) => {
                  localStorage.setItem('img2', data.base64);
                })
              setImg2(localStorage.getItem('img2'));
            }
            } />
          </CardActions>
        </Card>

        <Card className={classes.root}>
          <CardHeader
            title="Image 3"
          />
          <CardMedia
            id="img3"
            className={classes.media}
            image={img3}
          />
          <CardActions>
            <input type="file" name="file" accept="image/*" onChange={(event) => {
              console.log(event.target.files[0])
              fileUpload(event)
                .then((data) => {
                  localStorage.setItem('img3', data.base64);
                })
              setImg3(localStorage.getItem('img3'));
            }
            } />
          </CardActions>
        </Card>

        <Card className={classes.root}>
          <CardHeader
            title="Image 4"
          />
          <CardMedia
            id="img4"
            className={classes.media}
            image={img4}
          />
          <CardActions>
            <input type="file" name="file" accept="image/*" onChange={(event) => {
              console.log(event.target.files[0])
              fileUpload(event)
                .then((data) => {
                  localStorage.setItem('img4', data.base64);
                })
              setImg4(localStorage.getItem('img4'));
            }
            } />
          </CardActions>
        </Card>

        <Card className={classes.root}>
          <CardHeader
            title="Image 5"
          />
          <CardMedia
            id="img5"
            className={classes.media}
            image={img5}
          />
          <CardActions>
            <input type="file" name="file" accept="image/*" onChange={(event) => {
              console.log(event.target.files[0])
              fileUpload(event)
                .then((data) => {
                  localStorage.setItem('img5', data.base64);
                })
              setImg5(localStorage.getItem('img5'));
            }
            } />
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment >
  );
}