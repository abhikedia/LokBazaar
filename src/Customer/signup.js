import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from '../history';
import Portis from '@portis/web3';
import Web3 from 'web3';
import Contract from '../Contract/abi'

const Node = {
    nodeUrl: 'https://rpc-mumbai.matic.today',
    chainId: 80001,
};

const portis = new Portis('50420890-9e26-4e1d-8d95-1c02d245342d', Node);
const web3 = new Web3(portis.provider);
const swarm = require("swarm-js").at("http://swarm-gateways.net");
const CryptoJS = require('crypto-js');

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
    paper: {
        marginTop: theme.spacing(8),
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

export default function SignUp() {
    const classes = useStyles();

    const [email, setEmail] = React.useState(null);
    const [pin, setPIN] = React.useState(null);
    const [fname, setFname] = React.useState(null);
    const [lname, setLname] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [state, setState] = React.useState(null);
    const [hash, setHash] = React.useState(null);
    const [updated, setUpdated] = React.useState(0);
    const [eth_address, setEthAddress] = React.useState(null);

    React.useEffect(() => {
        if (updated) {
            database(hash);
        }
    }, [hash]);

    React.useEffect(() => {
        (async () => {
            web3.eth.getAccounts()
                .then((accounts) => {
                    setEthAddress(accounts[0]);
                    console.log(accounts[0])
                })
        })();
    },[]);

    const database = async (e) => {

        var bool = await Contract.methods.customerRegistrationCheck().call({ from: eth_address });
        if (!bool) {
            console.log('New registration')
            await Contract.methods.customerSignup('0x'.concat('', Buffer.from(e).toString('hex'))).send({ from: eth_address })
                .on('transactionHash', function (hash) { console.log(hash) })
                .then(
                    history.push('/signin/'),
                    window.location.reload()
                )
        }
        else
            alert('User Already Registered!')

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="First Name"
                                autoFocus
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Last Name"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="PIN"
                                value={pin}
                                onChange={(e) => setPIN(e.target.value)}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={
                            async () => {
                                setUpdated(1)
                                const body = JSON.stringify({
                                    "firstname": fname,
                                    "lastname": lname,
                                    "pin": pin,
                                    "state": state,
                                    "email": email,
                                    "phone": phone,
                                    "address": address
                                });
                                await swarm.upload(CryptoJS.AES.encrypt(body, 'SHAttErTechnologies').toString()).then(hash1 => {
                                    console.log(hash1)
                                    setHash(hash1);
                                })
                            }
                        }
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link variant="body2" onClick={() => {
                                history.push('/signin');
                                window.location.reload();
                            }}>
                                {"Already have an account? Sign in"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}