import React from "react";
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";

import {connect} from "react-redux"
import {editUserDetails} from "../redux/actions/userActions";


const styles = (theme) => ({
    ...theme
})

class EditDetails extends React.Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    componentDidMount() {
        const { credentials } = this.props
    }

    render() {
        return (
            <div>dcj</div>
        )
    }

}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));
