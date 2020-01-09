import React from 'react';
import PropTypes from 'prop-types'

// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const styles = {
    form: {
        textAlign: 'center'
    }
}

function Login(props) {

    const { classes } = props
    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <p>Hello</p>
            </Grid>
            <Grid item sm/>
        </Grid>
    );
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);
