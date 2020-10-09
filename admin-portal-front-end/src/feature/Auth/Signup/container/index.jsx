import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SignupForm } from '../components/SignupForm';
import { connect } from 'react-redux';
import { signupRequest, signupCloseDialog } from '../actions';
import { withRouter } from 'react-router-dom';
import { Container } from '@material-ui/core';
import ConfirmationDialog from 'feature/Common/Dialog/ConfirmationDialog';
import AlertDialog from 'feature/Common/Dialog/AlertDialog';

const Signup = (props) => {
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        props.isAuth && props.history.push('/cabinet');
    });

    const handleSubmit = (values) => {
        setConfirmDialogOpen(true);
        setFormData(values);
    };

    const handleConfirmConfirmationDialog = () => {
        props.signupRequest(formData);
        setConfirmDialogOpen(false);
    };

    const handleCloseConfirmationDialog = () => {
        setConfirmDialogOpen(false);
    };

    const handleCloseAlertDialog = () => {
        props.signupCloseDialog();
        props.history.push('/');
    };


    return (
        <Container>
            <SignupForm
                onSubmit={handleSubmit}
                isLoading={props.isLoading}
                isError={props.isError}
                errorMessage={props.errorMessage}
                isModalOpen={props.openSuccessDialog}
            />
            <ConfirmationDialog
                title={'Confirmation'}
                content={'Do you confirm that all of the data you entered is correct'}
                open={confirmDialogOpen}
                handleConfirm={handleConfirmConfirmationDialog}
                handleClose={handleCloseConfirmationDialog}
            />
            <AlertDialog
                title={'Email sent successfully.'}
                content={
                    'Please follow the steps as described in email for further registration.'
                }
                open={props.openSuccessDialog}
                handleClose={handleCloseAlertDialog}
            />
        </Container>
    );
};

Signup.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isAuth: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    signupRequest: PropTypes.func.isRequired,
    openSuccessDialog: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isLoading: state.auth.signup.isLoading,
    isAuth: state.auth.signin.isAuth,
    isError: state.auth.signup.isError,
    isSuccess: state.auth.signup.isSuccess,
    errorMessage: state.auth.signup.errorMessage,
    openSuccessDialog: state.auth.signup.openSuccessDialog,
});

export const SignupContainer = withRouter(
    connect(mapStateToProps, {signupRequest, signupCloseDialog})(Signup)
);
