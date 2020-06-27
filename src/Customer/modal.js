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

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        //maxWidth:'350'
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
        // vertical padding + font size from searchIcon
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


export default function TransitionsModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(null);
    React.useEffect(() => {
        setOpen(true)
        console.log(props)
    }, [])

    const handleOpen = () => {
        setOpen(true);
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
            <button type="button" onClick={handleOpen}>
                react-transition-group
      </button>
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
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
