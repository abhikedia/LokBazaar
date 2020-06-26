import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function ItemDetails(props) {
    const classes = useStyles();
    const [itemname, setItemname] = React.useState(null);
    const [category, setCategory] = React.useState(null);
    const [header, setHeader] = React.useState(null);
    const [price, setPrice] = React.useState(null);
    const [quantity, setQuantity] = React.useState(null);
    const [description, setDescription] = React.useState(null);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={itemname}
                                onChange={(e) => {
                                    setItemname(e.target.value)
                                    props.parentCallback1(e.target.value);
                                }}
                                label="Item Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value)
                                    props.parentCallback2(e.target.value)
                                }}
                                fullWidth
                                label="Item Category"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={header}
                                onChange={(e) => {
                                    setHeader(e.target.value)
                                    props.parentCallback3(e.target.value)
                                }}
                                label="Header to be displayed"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                required
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value)
                                    props.parentCallback4(e.target.value)
                                }}
                                fullWidth
                                label="Item Price"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={quantity}
                                onChange={(e) => {
                                    setQuantity(e.target.value)
                                    props.parentCallback5(e.target.value)
                                }}
                                label="Item Quantity"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                multiline
                                rows={8}
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                    props.parentCallback6(e.target.value)
                                }}
                                required
                                fullWidth
                                label="Item Description"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    {/* <Grid container justify="flex-end">
                        <Grid item>
                            <Link variant="body2" onClick={() => {
                                history.push('/signin');
                                window.location.reload();
                            }}>
                                {"Already have an account? Sign in"}
                            </Link>
                        </Grid>
                    </Grid> */}
                </form>
            </div>
            {/* <Box mt={5}>
                <Copyright />
            </Box> */}
        </Container>
    );
}