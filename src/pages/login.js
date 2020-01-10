import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Monkey from '../images/monkey.png'
import axios from 'axios'
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
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto',
    },
    pageTitle: {
        margin: '10px auto',
    },
    textField: {
        margin: '10px auto',
    },
    button: {
        marginTop: 20
    }
}

function Login(props) {

    const [state, setState] = useState({
        loading: false,
        errors: {},
        password: '',
        showPassword: false,
        email: ''
    })

    function handleClickShowPassword() {
        setState({...state, showPassword: !state.showPassword})
    }

    function handleMouseDownPassword(e) {
        e.preventDefault()
    }

    function handleChange(e) {
        setState({...state, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        //console.log(state) errors obj is empty
        e.preventDefault()
        setState({
            loading: true
        })
        const userData = {
            email: state.email,
            password: state.password
        }
        axios.post('login', userData)
            .then(res => {
                console.log(state)
                //console.log(res.data)
                setState({
                    ...state,
                    loading: false
                })
                // Redirect to homepage if login successful
                props.history.push('/')
            })
            .catch(err => {
                console.log(err)
                setState({
                    errors: err.response.data,
                    loading: false
                })
            })
    }

    const {classes} = props
    const {errors, loading} = state

    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <img src={Monkey} alt="Monkey image" className={classes.image}/>
                <Typography variant={"h2"} className={classes.pageTitle}>Login</Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        name={"email"}
                        label={"Email"}
                        className={classes.textField}
                        //helperText={errors.email}
                        // error={errors.email ? true : false}
                        value={state.email}
                        onChange={handleChange}
                        fullWidth
                        autoFocus={true}
                    />
                    <FormControl fullWidth>
                        <InputLabel htmlFor={"password"}>Password</InputLabel>
                        <Input
                            className={classes.textField}
                            id={"password"}
                            type={state.showPassword ? 'text' : 'password'}
                            value={state.password}
                            name={"password"}
                            fullWidth
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position={"end"}>
                                    <IconButton
                                        aria-label={"toggle password visibility"}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <Button type={"submit"} variant={"contained"} color={"primary"}
                            className={classes.button}>Login</Button>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    );
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);
