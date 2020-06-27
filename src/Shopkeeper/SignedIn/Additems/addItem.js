import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from '../listItems';
import ItemDetails from './ItemDetails';
import ImageForm from './ImageForm';
import history from '../../../history'

const swarm = require("swarm-js").at("http://swarm-gateways.net");

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

const drawerWidth = 240;
const steps = ['Item Category', 'Add Images'];




const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },

    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    layout: {
        width: 'auto',
        marginTop: theme.spacing(15),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

// const uploadImages = async () => {
//     const body = JSON.stringify({
//         "img1": 'data:image/png;base64,' + localStorage.getItem('img1'),
//         "img2": 'data:image/png;base64,' + localStorage.getItem('img1'),
//         "img3": 'data:image/png;base64,' + localStorage.getItem('img1'),
//         "img4": 'data:image/png;base64,' + localStorage.getItem('img1'),
//         "img5": 'data:image/png;base64,' + localStorage.getItem('img1'),
//     });
//     await swarm.upload(body).then(hash1 => {
//         console.log(hash1)
//         console.log(itemname)
//         console.log(category)
//         console.log(header)
//         console.log(price)
//         console.log(quantity)
//         console.log(description)

//         // var url = "http://localhost:4000/addItem";
//         // await fetch(url, {
//         //     method: "POST", // or 'PUT'
//         //     mode: "cors",
//         //     body: JSON.stringify({
//         //         item_id: ,
//         //         item_name:,
//         //         item_seller: ,
//         //         category:,
//         //         quantity:,
//         //         item_price:,
//         //         image_hash:hash1,
//         //         description:
//         //     }), // data can be `string` or {object}!
//         //     headers: {
//         //         "Content-Type": "application/json"
//         //     }
//         // })
//         //     .then(res => res.body)
//         //     .then(response => {
//         //         console.log("Success:", JSON.stringify(response))
//         //         history.push('/sellersignin')
//         //         window.location.reload()
//         //     })
//         //     .catch(error => console.error("Error:", error));
//     })
//     localStorage.clear();
// }

export default function AddItem() {
    const classes = useStyles();
    const [itemname, setItemname] = React.useState(null);
    const [category, setCategory] = React.useState(null);
    const [header, setHeader] = React.useState(null);
    const [price, setPrice] = React.useState(null);
    const [quantity, setQuantity] = React.useState(null);
    const [description, setDescription] = React.useState(null);

    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const uploadImages = async () => {
        const body = JSON.stringify({
            "img1": 'data:image/png;base64,' + localStorage.getItem('img1'),
            "img2": 'data:image/png;base64,' + localStorage.getItem('img1'),
            "img3": 'data:image/png;base64,' + localStorage.getItem('img1'),
            "img4": 'data:image/png;base64,' + localStorage.getItem('img1'),
            "img5": 'data:image/png;base64,' + localStorage.getItem('img1'),
        });
        await swarm.upload(body).then(async hash1 => {
            console.log(hash1)
            console.log(itemname)
            console.log(category)
            console.log(header)
            console.log(price)
            console.log(quantity)
            console.log(description)

            var url = "http://localhost:4000/addItem";
            await fetch(url, {
                method: "POST", // or 'PUT'
                mode: "cors",
                body: JSON.stringify({
                    //item_id: ,
                    item_name: itemname,
                    //item_seller: ,
                    category:category,
                    quantity:quantity,
                    item_price:price,
                    image_hash:hash1,
                    description:description,
                    header:header
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
        })
        localStorage.clear();
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <ItemDetails parentCallback1={callbackFunction1}
                    parentCallback2={callbackFunction2}
                    parentCallback3={callbackFunction3}
                    parentCallback4={callbackFunction4}
                    parentCallback5={callbackFunction5}
                    parentCallback6={callbackFunction6} />;
            case 1:
                return <ImageForm />;
            default:
                throw new Error('Unknown step');
        }
    }

    const callbackFunction1 = (childData) => {
        setItemname(childData);
    }
    const callbackFunction2 = (childData) => {
        setCategory(childData);
    }
    const callbackFunction3 = (childData) => {
        setHeader(childData);
    }
    const callbackFunction4 = (childData) => {
        setPrice(childData);
    }
    const callbackFunction5 = (childData) => {
        setQuantity(childData);
    }
    const callbackFunction6 = (childData) => {
        setDescription(childData);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Add Items
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            <React.Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Item Details
          </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                uploadImages(),
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Item Added to the store.
                                    </Typography>
                                </React.Fragment>

                                // history.push('/sellersignin'),
                                // uploadImages(),
                                // window.setTimeout(function () { window.location.reload() }, 3000)
                            ) : (
                                    <React.Fragment>
                                        {getStepContent(activeStep)}
                                        <div className={classes.buttons}>
                                            {activeStep !== 0 && (
                                                <Button onClick={handleBack} className={classes.button}>
                                                    Back
                                                </Button>
                                            )}
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Add' : 'Next'}
                                            </Button>
                                        </div>
                                    </React.Fragment>
                                )}
                        </React.Fragment>
                    </Paper>
                    <Copyright />
                </main>
            </React.Fragment>
        </div>
    );
}
