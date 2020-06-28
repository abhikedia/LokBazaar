import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Portis from '@portis/web3';
import Web3 from 'web3';
import Contract from '../Contract/abi'

const Node = {
    nodeUrl: 'https://testnetv3.matic.network',
    chainId: 3,
};

const portis = new Portis('af9218a6-9a1a-475b-95d3-40c96cb81b80', Node);
const web3 = new Web3(portis.provider);
const swarm = require("swarm-js").at("http://swarm-gateways.net");
const CryptoJS = require('crypto-js');

const useStyles = makeStyles((theme) => ({
    root1: {
        display: 'flex',
        maxWidth: 500,
        //maxHeight: 500,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        maxWidth: '350',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        //maxWidth:'350'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));


export default function TransitionsModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(null);
    const [open1, setOpen1] = React.useState(false);
    const [value, setValue] = React.useState("");
    const classes1 = useStyles();
    const [eth_address, setEthAddress] = React.useState(null);

    function hex2a(hexx) {
        var hex = hexx.toString();//force conversion
        var str = '';
        for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }

    React.useEffect(() => {
        setOpen(true)
        setEthAddress(props.location.state.address);
    }, [])

    const handleOpen = () => {
        setOpen1(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    var tileData;
    const modalimages = (options) => (
        tileData = [
            {
                img: localStorage.getItem(options.image_hash + 'img1'),
                title: 'Image 1'
            },
            {
                img: localStorage.getItem(options.image_hash + 'img2'),
                title: 'Image 2'
            },
            {
                img: localStorage.getItem(options.image_hash + 'img3'),
                title: 'Image 3'
            },
            {
                img: localStorage.getItem(options.image_hash + 'img4'),
                title: 'Image 4'
            },
            {
                img: localStorage.getItem(options.image_hash + 'img5'),
                title: 'Image 5'
            }
        ],

        < GridList className={classes.gridList} cols={1} >
            {
                tileData.map((tile) => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            actionIcon={
                                <IconButton aria-label={`star ${tile.title}`}>
                                    {/* <StarBorderIcon className={classes.title} /> */}
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))
            }
        </GridList >
    );

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div>
                        <div className={classes.root1}>
                            {
                                modalimages(props.location.state.options)
                            }
                        </div>

                        <div className={classes.paper}>
                            <Typography variant="h2" component="h2" gutterBottom>
                                {props.location.state.options.header} {props.location.state.options.item_name}
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                Price: {props.location.state.options.item_price}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Quantity Available: {props.location.state.options.quantity}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Description: {props.location.state.options.description}
                            </Typography>
                            <Button variant="contained" color="primary" fullWidth onClick={handleOpen}> Message </Button>
                        </div>
                        <div>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes1.modal}
                                open={open1}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={open1}>
                                    <div className={classes1.paper}>
                                        <div>
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Send seller a message"
                                                multiline
                                                fullWidth
                                                value={value}
                                                onChange={e => setValue(e.target.value)}
                                                rows={6}
                                                variant="outlined"
                                            />
                                        </div>
                                        <Button variant="contained" color="secondary" fullWidth onClick={async () => {
                                            console.log(eth_address)
                                            console.log(props.location.state.options.item_seller)
                                            var qid = await Contract.methods.getSellerqid(props.location.state.options.item_seller).call({ from: eth_address });
                                            console.log(qid)
                                            var temp = ''
                                            for (var i = 2; i < qid.length; i++)
                                                temp += qid[i]
                                            console.log(temp)
                                            qid = hex2a(temp)
                                            console.log(qid)

                                            swarm.download(qid).then(async array => {
                                                const str = swarm.toString(array);
                                                const bytes = CryptoJS.AES.decrypt(str, 'SHAttErTechnologies');
                                                const originalText = bytes.toString(CryptoJS.enc.Utf8);
                                                const answer = JSON.parse(originalText);
                                                console.log(answer.phone);
                                                console.log(value)
                                                await fetch("https://inteltech.p.rapidapi.com/send.php", {
                                                    "method": "POST",
                                                    "headers": {
                                                        "x-rapidapi-host": "inteltech.p.rapidapi.com",
                                                        "x-rapidapi-key": "",
                                                        "content-type": "application/x-www-form-urlencoded"
                                                    },
                                                    "body": {
                                                        "schedule": "1377959755",
                                                        "senderid": "MyCompany",
                                                        "return": "http://yourwebsite.com",
                                                        "username": "",
                                                        "key": "",
                                                        "sms": parseInt(answer.phone),
                                                        "message": value
                                                    }
                                                })
                                                    .then(response => {
                                                        console.log(response);
                                                        window.location.reload();
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    });
                                            });
                                            //window.location.reload();
                                        }}>Send</Button>
                                    </div>
                                </Fade>
                            </Modal>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
