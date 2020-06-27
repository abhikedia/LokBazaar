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
import Contract from '../Contract/abi.js'
import Portis from '@portis/web3';
import Web3 from 'web3';

const Node = {
    nodeUrl: 'https://testnetv3.matic.network',
    chainId: 3,
};

const portis = new Portis('af9218a6-9a1a-475b-95d3-40c96cb81b80', Node);
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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [eth_address, setEthAddress] = React.useState(null);
    const [fname, setFname] = React.useState(null);
    const [lname, setLname] = React.useState(null);
    const [reg, setReg] = React.useState(null);
    const [category, setCategory] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [gst, setGst] = React.useState(null);
    const [hash, setHash] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [updated, setUpdated] = React.useState(0);

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
    });

    const database = async (e) => {

        var bool = await Contract.methods.sellerRegistrationCheck().call({ from: eth_address });
        if (!bool) {
            await Contract.methods.sellerSignup('0x'.concat('', Buffer.from(e).toString('hex'))).send({ from: eth_address })
                .on('transactionHash', function (hash) { console.log(hash) })
        }
        else
            alert('User Already Registered!')

        var url = "http://localhost:4000/addSeller";
        await fetch(url, {
            method: "POST", // or 'PUT'
            mode: "cors",
            body: JSON.stringify({
                GST: gst,
                address: eth_address
            }), // data can be `string` or {object}!
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.body)
            .then(response => {
                console.log("Success:", JSON.stringify(response))
                history.push('/sellersignin')
                window.location.reload()
            })
            .catch(error => console.error("Error:", error));

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
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                required
                                fullWidth
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                fullWidth
                                label="Last Name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                autoComplete="email"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={reg}
                                onChange={(e) => setReg(e.target.value)}
                                label="Registration Number"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                label="Shop Category"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                label="Phone Number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={gst}
                                onChange={(e) => setGst(e.target.value)}
                                label="GST Information"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                label="Address"
                            />
                        </Grid>

                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={
                            async () => {
                                setUpdated(1);
                                const body = JSON.stringify({
                                    "firstname": fname,
                                    "lastname": lname,
                                    "registration": reg,
                                    "category": category,
                                    "gst": gst,
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
                        className={classes.submit}
                    >Sign Up </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link variant="body2" onClick={() => {
                                history.push('/sellersignin');
                                window.location.reload();
                            }}>
                                {"Already have an account? Sign in(Seller)"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container >
    );


}

