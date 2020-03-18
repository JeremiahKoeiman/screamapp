import React, {useState, Fragment} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types"
import MyButton from "../../util/MyButton";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline"

import {connect} from "react-redux"
import {deleteScream} from "../../redux/actions/dataActions"

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%'
    }
}

const initState = {
    open: false
}

function DeleteScream(props) {

    const [state, setState] = useState(initState)

    const handleOpen = () => {
        setState({open: true})
    }

    const handleClose = () => {
        setState({open: false})
    }

    const deleteScream = () => {
        props.deleteScream(props.screamId)
        setState({open: false})
    }

    const {classes} = props

    return (
        <Fragment>
            <MyButton tip={'Delete scream'} onClick={handleOpen} btnClassName={classes.deleteButton}>
                <DeleteOutline color={'secondary'}/>
            </MyButton>
            <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth={'sm'}>
                <DialogTitle>
                    Are you sure you want to delete this scream?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color={'primary'}>
                        Cancel
                    </Button>
                    <Button onClick={deleteScream} color={'secondary'}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(null, {deleteScream})(withStyles(styles)(DeleteScream));
