## Video
`https://www.youtube.com/watch?v=TAcOTvQJH-U&list=PLMhAeHCz8S38ryyeMiBPPUnFAiWnoPvWP&index=15`
2:15

## Api test
To test api's user [Postman](https://www.getpostman.com/downloads/). It's free to use on Windows & MacOS.

# Problems / errors
Commit before error occured: `d572b1cff838dc98da65823489d1a34c6b3513a7`

CODE: ``` import React, {useState, useEffect} from 'react';
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
                            errors: {
                                email: '',
                                password: ''
                            },
                            password: '',
                            showPassword: false,
                            email: ''
                        })
                    
                        useEffect(() => {
                            const abortController = new AbortController()
                    
                            setState({
                                loading: true
                            })
                            const userData = {
                                email: state.email,
                                password: state.password
                            }
                            axios.post('/login', userData)
                                .then((res) => {
                                    //console.log(state)
                                    console.log(res.data)
                                    setState({
                                        loading: false
                                    })
                                    // Redirect to homepage if login successful
                                    props.history.push('/')
                                })
                                .catch(err => {
                                    //console.log(err)
                                    setState({
                                        errors: err.response.data,
                                        loading: false
                                    })
                                })
                    
                            return function cleanup() {
                                console.log(state)
                                abortController.abort()
                            }
                        }, [state.email, state.password, props.history])
                    
                        function handleClickShowPassword() {
                            setState({...state, showPassword: !state.showPassword})
                        }
                    
                        function handleMouseDownPassword(e) {
                            e.preventDefault()
                        }
                    
                        function handleChange(e) {
                            setState({...state, [e.target.name]: e.target.value})
                        }
                    
                        /*function handleSubmit(e) {
                            //console.log(state) errors obj is empty
                            e.preventDefault()
                            setState({
                                loading: true
                            })
                            const userData = {
                                email: state.email,
                                password: state.password
                            }
                            axios.post('/login', userData)
                                .then((res) => {
                                    //console.log(state)
                                    console.log(res.data)
                                    console.log(res.status)
                                    console.log(res.statusText)
                                    setState({
                                        loading: false
                                    })
                                    // Redirect to homepage if login successful
                                    props.history.push('/')
                                })
                                .catch((err) => {
                                    //console.log(err)
                                    setState({
                                        errors: err.response.data,
                                        loading: false
                                    })
                                })
                        }*/
                    
                        const {classes} = props
                        const {errors, email, password} = state
                    
                        return (
                            <Grid container className={classes.form}>
                                <Grid item sm/>
                                <Grid item sm>
                                    <img src={Monkey} alt="Monkey image" className={classes.image}/>
                                    <Typography variant={"h2"} className={classes.pageTitle}>Login</Typography>
                                    <form //onSubmit={handleSubmit
                                        noValidate
                                        >
                                        <TextField
                                            name={"email"}
                                            label={"Email"}
                                            className={classes.textField}
                                            /*helperText={errors.email}
                                            error={errors.email ? true : false}*/
                                            value={email}
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
                                                /*helperText={errors.password}
                                                error={errors.password ? true : false}*/
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
                    
                    export default withStyles(styles)(Login);```


Error one: `Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.`
Resources: [Stackoverflow](https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input), [Google](https://www.google.com/search?client=firefox-b-d&q=Can%27t+perform+a+React+state+update+on+an+unmounted+component.+This+is+a+no-op%2C+but+it+indicates+a+memory+leak+in+your+application.+To+fix%2C+cancel+all+subscriptions+and+asynchronous+tasks+in+a+useEffect+cleanup+function.),

Error two: `Consider adding an error boundary to your tree to customize error handling behavior.Visit https://fb.me/react-error-boundaries to learn more about error boundaries.` [Google](https://www.google.com/search?client=firefox-b-d&q=Consider+adding+an+error+boundary+to+your+tree+to+customize+error+handling+behavior.Visit+https%3A%2F%2Ffb.me%2Freact-error-boundaries+to+learn+more+about+error+boundaries.)

Other resources: [Github](https://github.com/facebook/react/issues/15006), [Medium](https://medium.com/@selvaganesh93/how-to-clean-up-subscriptions-in-react-components-using-abortcontroller-72335f19b6f7), [Stackoverflow](https://stackoverflow.com/questions/58038008/how-to-stop-memory-leak-in-useeffect-hook-react), [React](https://reactjs.org/docs/hooks-effect.html)

Axios: [logrocket](https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/)
#
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
