import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import market from '../Assets/market.jpg'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import history from '../history';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                lokbazaar.in
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    textField: {
        width: '25ch',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        //backgroundImage: 'url(../Assets/${market.jpg})',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        marginTop: theme.spacing(40),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(5),
    },
    submit: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(2)
    }
}));


export default function SimpleContainer(props) {
    const [updated, setUpdated] = React.useState(0);
    const [options, setOptions] = React.useState([]);
    const [move, setMove] = React.useState(0);

    React.useEffect(() => {
        (async () => {
            if (updated) {
                database(field, search);
            }
        })();
    }, [updated]);

    React.useEffect(() => {
        (async () => {
            if (move) {
                history.push('/signin/home/search', { options: options,address:props.location.state.address });
                window.location.reload();
            }
        })();
    }, [move]);

    const database = async (f, s) => {
        console.log("Inside database")
        if (f === 'Item')
            var url = "http://localhost:4000/getItems/" + s;
        else
            var url = "http://localhost:4000/getCategory/" + s;

        function createData(item_id, item_name, item_seller, category, quantity, item_price, image_hash, description, header) {
            console.log('in')
            return { item_id, item_name, item_seller, category, quantity, item_price, image_hash, description, header };
        }

        await fetch(url, {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(data => {
            const row = [];
            for (var i in data)
                row.push(createData(data[i].item_id, data[i].item_name, data[i].item_seller, data[i].category, data[i].quantity, data[i].item_price, data[i].image_hash
                    , data[i].description, data[i].header));
            setOptions(row)
        }).catch(err => {
            console.log('caught it!', err);
        })

        setUpdated(0);
        setMove(1);
    }

    const classes = useStyles();
    const [search, setSearch] = React.useState(null);
    const [field, setField] = React.useState(null);



    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <SearchIcon />
                    </Avatar>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    fullWidth
                                    label="Search"
                                    autoFocus
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={
                                async () => {
                                    setField('Item');
                                    setUpdated(1);
                                }
                            }
                        >
                            Search by Item
                    </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={
                                async () => {
                                    setField('Category');
                                    setUpdated(1);
                                }
                            }
                        >
                            Search by Category
                    </Button>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </Grid>
    );
}