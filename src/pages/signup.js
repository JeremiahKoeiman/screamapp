import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Monkey from '../images/monkey.png'
import {Link} from "react-router-dom";
// Redux
import {connect} from "react-redux";
import {signupUser} from "../redux/actions/userActions";
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

class Signup extends Component {
    state = {
        errors: {},
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        email: '',
        handle: ''
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.ui.errors)
            this.setState({ errors: nextProps.ui.errors })
    }

    handleClickShowPassword = () => {
        this.setState({...this.state, showPassword: !this.state.showPassword})
    }

    handleClickShowConfirmPassword = () => {
        this.setState({...this.state, showConfirmPassword: !this.state.showConfirmPassword})
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
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData, this.props.history)
    }

    render() {
        const {classes, ui: { loading }} = this.props
        const {errors} = this.state

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={Monkey} alt="Monkey" className={classes.image}/>
                    <Typography variant={"h2"} className={classes.pageTitle}>Sign up</Typography>
                    <form onSubmit={this.handleSubmit} noValidate>
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

                        <FormControl error={errors.confirmPassword ? true : false} fullWidth>
                            <InputLabel htmlFor={"confirmPassword"}>Confirm password</InputLabel>
                            <Input
                                className={classes.textField}
                                id={"confirmPassword"}
                                type={this.state.showConfirmPassword ? 'text' : 'password'}
                                value={this.state.confirmPassword}
                                name={"confirmPassword"}
                                fullWidth
                                onChange={this.handleChange}
                                endAdornment={
                                    <InputAdornment position={"end"}>
                                        <IconButton
                                            aria-label={"toggle password visibility"}
                                            onClick={this.handleClickShowConfirmPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText>{errors.confirmPassword}</FormHelperText>
                        </FormControl>

                        <TextField
                            id={"handle"}
                            name={"handle"}
                            type={"text"}
                            label={"Handle"}
                            className={classes.textField}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth
                        />

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
                            Sign up
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                    </form>
                    <small>Already have an account? Login <Link to={"/login"}>here</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(Signup));
