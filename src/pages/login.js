import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Monkey from '../images/monkey.png';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {loginUser} from "../redux/actions/userActions";
// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"


const styles = (theme) => ({
    ...theme.spreadThis
})

class Login extends Component {

    state = {
        errors: {},
        password: '',
        showPassword: false,
        email: ''
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.ui.errors)
            this.setState({ errors: nextProps.ui.errors })
    }

    handleClickShowPassword = () => {
        this.setState({...this.state, showPassword: !this.state.showPassword})
    }

    handleMouseDownPassword = (e) => {
        e.preventDefault()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history)
    }

    render() {
        const {classes, ui: {loading}} = this.props
        const {errors} = this.state

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={Monkey} alt="Monkey" className={classes.image}/>
                    <Typography variant={"h2"} className={classes.pageTitle}>Login</Typography>
                    <form onSubmit={this.handleSubmit}
                          noValidate
                    >
                        <TextField
                            name={"email"}
                            label={"Email"}
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                            autoFocus={true}
                        />
                        <FormControl error={errors.password ? true : false} fullWidth>
                            <InputLabel htmlFor={"password"}>Password</InputLabel>
                            <Input
                                className={classes.textField}
                                id={"password"}
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                name={"password"}
                                fullWidth
                                onChange={this.handleChange}
                                endAdornment={
                                    <InputAdornment position={"end"}>
                                        <IconButton
                                            aria-label={"toggle password visibility"}
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText>{errors.password}</FormHelperText>
                        </FormControl>

                        {errors.general && (
                            <Typography variant={"body2"} className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            className={classes.button}
                            disabled={loading}
                        >
                            Login
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                    </form>
                    <small>Don't have an account yet? Sign up <Link to={"/signup"}>here</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
