import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import contract from '../Contract/abi'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Portis from '@portis/web3';
import Grid from '@material-ui/core/Grid';
import history from '../history'
import Web3 from 'web3';

const swarm = require("swarm-js").at("http://swarm-gateways.net");
const Node = {
    nodeUrl: 'https://rpc-mumbai.matic.today',
    chainId: 80001,
};

const portis = new Portis('50420890-9e26-4e1d-8d95-1c02d245342d', Node);
const web3 = new Web3(portis.provider);

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    root: {
        minWidth: 350,
        margin: 15
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    media: {
        height: 140,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    balance: {
        display: 'flex',
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

const PrimarySearchAppBar = React.memo(props => {
    const [options, setOptions] = React.useState([]);
    const [count, setCount] = React.useState(null);

    React.useLayoutEffect(() => {
        setOptions(props.location.state.options)
        localStorage.clear();
    }, []);

    React.useLayoutEffect(() => {
        bal();
    }, []);

    React.useEffect(() => {
        (async () => {
            var url = "http://localhost:4000/getOrderCount";
            await fetch(url)
                .then(response => response.json())
                .then(response => {
                    if (response.data.length === 0)
                        setCount(0)
                    else
                        setCount(response.data[0].item_id);
                })
                .catch(err => console.log(err));

            console.log(count);
        })();
    }, []);

    const bal = async event => {
        try {
            var bal = await web3.eth.getBalance(props.location.state.address);
            console.log('balance', bal)
            bal = web3.utils.fromWei(bal, 'ether');
            setBal(bal);
        }
        catch (err) {
            console.log('Balance Update failed!')
        }
    }

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [balance, setBal] = React.useState('0.00')
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const getOrders = (event) => {
        event.preventDefault();
        history.push('/signin/home/search/orders', { address: props.location.state.address });
        window.location.reload();
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={getOrders}>My Orders</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const showResults = (
        <Grid container>
            {
                options.map((options) => (
                    swarm.download(options.image_hash).then(async array => {
                        const str = swarm.toString(array);
                        const answer = JSON.parse(str);
                        localStorage.setItem(options.image_hash + 'img1', answer.img1);
                        localStorage.setItem(options.image_hash + 'img2', answer.img2);
                        localStorage.setItem(options.image_hash + 'img3', answer.img3);
                        localStorage.setItem(options.image_hash + 'img4', answer.img4);
                        localStorage.setItem(options.image_hash + 'img5', answer.img5);
                    }),
                    < Card className={classes.root} >
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={localStorage.getItem(options.image_hash + 'img1')}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {options.header} {options.item_name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Price: {options.item_price} Eth
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={async () => {

                                await contract.methods.transfer(options.item_seller).send({
                                    from: props.location.state.address,
                                    value: web3.utils.toWei(options.item_price.toString(), 'ether')
                                })
                                    .on('transactionHash', async function (hash) {
                                        console.log(hash)
                                        // const block = await web3.eth.getTransaction(hash).blockNumber;
                                        // if (!block) {
                                        //     alert('Not enough Eth!')
                                        //     window.location.reload()
                                        // }
                                        // else {
                                        var url = "http://localhost:4000/addOrder";
                                        try {
                                            await fetch(url, {
                                                method: "POST", // or 'PUT'
                                                mode: "cors",
                                                body: JSON.stringify({
                                                    order_id: count + 1,
                                                    item_name: options.item_name,
                                                    item_price: options.item_price,
                                                    item_seller: options.item_seller,
                                                    customer: props.location.state.address,
                                                    tx_hash: hash
                                                }), // data can be `string` or {object}!
                                                headers: {
                                                    "Content-Type": "application/json"
                                                }
                                            })
                                                .then(res => res.body)
                                                .then(response => {
                                                    console.log("Success:")
                                                    window.location.reload()
                                                })
                                                .catch(error => console.error("Error:", error));
                                        }
                                        catch (err) {
                                            alert('Try Again!')
                                        }
                                        // }
                                    })

                            }}>Buy</Button>

                            <Button size="small" color="primary" onClick={() => {
                                history.push('/signin/home/search/view', { options: options, id: options.item_id, address: props.location.state.address });
                                window.location.reload();
                            }} >View Details </Button>
                        </CardActions>
                    </Card>
                ))
            }
        </Grid>
    );

    return (
        <div>
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Your Search Results
                    </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Typography variant="h6" color="inherit" className={classes.balance}>
                                Balance: {balance} Eth
                        </Typography>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
                {showResults}
            </div>
        </div >
    );
})

export default PrimarySearchAppBar;