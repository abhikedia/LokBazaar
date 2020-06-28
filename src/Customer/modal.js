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

    React.useEffect(() => {
        setOpen(true)
        console.log(props)
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
                                            window.location.reload();
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
