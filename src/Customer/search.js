import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import market from '../Assets/market.jpg'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
        width: '25ch',
    }
}));


export default function SimpleContainer() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <Container>
                <Typography component="div" style={{ height: '100vh', marginLeft: '0', paddingLeft: '0', minWidth: '200vh', backgroundImage: `url(${market})`, resize: '100' }} />
                <div className={classes.root}>
                    <div>
                        <TextField
                            id="standard-full-width"
                            label="Label"
                            style={{ margin: 8 }}
                            placeholder="Placeholder"
                            helperText="Full width!"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
            </Container>
        </React.Fragment>
        // <Paper style={styles.paperContainer}>
        //     Some text to fill the Paper Component
        // </Paper>
    );
}