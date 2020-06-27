import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import history from '../history';
import Portis from '@portis/web3';
import Web3 from 'web3';
import contract from '../Contract/abi.js';

const Node = {
    nodeUrl: 'https://testnetv3.matic.network',
    chainId: 3,
};

const portis = new Portis('af9218a6-9a1a-475b-95d3-40c96cb81b80', Node);
const web3 = new Web3(portis.provider);

const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(42)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eth_address: ''
        }
    }

    checkLogin = async event => {
        event.preventDefault();
        await web3.eth.getAccounts()
            .then((accounts) => {
                this.setState({
                    eth_address: accounts[0]
                })
            })
        console.log(this.state.eth_address);
        var bool = await contract.methods.sellerRegistrationCheck().call({ from: this.state.eth_address });
        if (!bool)
            alert("User not registered!");
        else {
            history.push('/sellersignin/dashboard', { address: this.state.eth_address });
            window.location.reload();
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.checkLogin}
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link variant="body2" onClick={() => {
                                        history.push('/sellersignup');
                                        window.location.reload();
                                    }}>
                                        {"Don't have an account? Register(Seller)"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        );
    }
}
export default (withStyles(styles))(Login);