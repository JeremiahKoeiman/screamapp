import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
// Material-ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";

function Navbar(props) {
    const {authenticated} = props

    return (
        <AppBar>
            <Toolbar className={'nav-container'}>
                {
                    authenticated
                        ?
                        (
                            <Fragment>
                                <MyButton tip={"Post a Scream!"}>
                                    <AddIcon/>
                                </MyButton>
                                <MyButton tip={"Home"}>
                                    <Link to={'/'}>
                                        <HomeIcon/>
                                    </Link>
                                </MyButton>
                                <MyButton tip={"Notifications"}>
                                    <NotificationsIcon/>
                                </MyButton>
                            </Fragment>
                        )
                        :
                        (
                            <Fragment>
                                <Button color={"inherit"} component={Link} to={'/login'}>Login</Button>
                                <Button color={"inherit"} component={Link} to={'/'}>Home</Button>
                                <Button color={"inherit"} component={Link} to={'/signup'}>Signup</Button>
                            </Fragment>
                        )
                }

            </Toolbar>
        </AppBar>
    );
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
