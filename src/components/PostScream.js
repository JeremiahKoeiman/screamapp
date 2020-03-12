import React, {Fragment, Component} from 'react';
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import MyButton from "../util/MyButton";
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";

import {connect} from "react-redux"
import {postScream, clearErrors} from "../redux/actions/dataActions";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton: {
        position: 'relative',
        marginBottom: '15px'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '3%'
    }

})

class PostScream extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                body: '',
                open: false,
                errors: {}
            })
        }
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.props.clearErrors()
        this.setState({open: false, errors: {} })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.postScream({ body: this.state.body })
    }

    render() {
        const { errors } = this.state
        const { classes, UI: { loading } } = this.props

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip={"Post a Scream!"}>
                    <AddIcon/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth={'sm'}>
                    <MyButton tip={'Close'} onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>Post a new Scream</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name={'body'}
                                type={'text'}
                                label={'SCREAM!!!'}
                                multiline
                                rows={'3'}
                                placeholder={'Scream at your fellow friends!!'}
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                fullWidth
                                onChange={this.handleChange}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}
                                    className={classes.submitButton}
                                    disabled={loading}>
                                Submit
                                {
                                    loading &&
                                    (
                                        <CircularProgress size={30} className={classes.progressSpinner}/>
                                    )
                                }
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.ui
})

export default connect(mapStateToProps, {postScream, clearErrors})(withStyles(styles)(PostScream));
