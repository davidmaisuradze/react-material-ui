import React from 'react';
import PropTypes from 'prop-types';
import { SetPasswordForm } from '../components/SetpasswordForm';
import { connect } from 'react-redux';
import { setPasswordRequest, setPasswordCloseDialog, checkTokenValidity, renewToken } from '../actions';
import { withRouter } from 'react-router-dom';
import { Container } from '@material-ui/core';
import AlertDialog from 'feature/Common/Dialog/AlertDialog';

class SetPassword extends React.Component {
    state = {passwordsMatched: true};

    handleCloseAlertDialog = () => {
        this.props.setPasswordCloseDialog();
        this.props.history.push('/');
    };

    componentDidMount() {
        const {id, token} = this.props.match.params;
        this.props.checkTokenValidity({token: token, id: id});
    }

    handleSubmit = (values) => {
        const {id, token} = this.props.match.params;
        if (values.password !== values.confirmPassword) {
            this.setState({passwordsMatched: false});
            return;
        }

        this.setState({passwordsMatched: true});
        if (this.props.isTokenValid) {
            this.props.setPasswordRequest({password: values.password, token, id});
        } else {
            !this.props.isTokenValid && this.props.renewToken({token, id});
        }
    };

    componentDidUpdate() {
        if (
            (!this.props.isTokenValid &&
                this.props.tokenValidityErrorStatus !== 401) ||
            (this.props.isSuccess && !this.props.openSuccessDialog)
        ) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            !this.props.checkingValidity && (
                <Container>
                    <SetPasswordForm
                        handleSubmit={this.handleSubmit}
                        isLoading={this.props.isLoading || this.props.isSendingNewToken}
                        isTokenValid={this.props.isTokenValid}
                        passwordsMatched={this.state.passwordsMatched}
                        passIsError={this.props.isError}
                        passErrorMessage={this.props.errorMessage}
                        emailIsError={this.props.newTokenSendingFailed}
                        emailErrorMessage={this.props.errorMessageNewToken}
                    />
                    <AlertDialog
                        title={'Email sent successfully.'}
                        content={
                            'Please follow the steps as described in email for further registration.'
                        }
                        open={this.props.openSuccessDialog}
                        handleClose={this.handleCloseAlertDialog}
                    />
                </Container>
            )
        );
    }
}

SetPassword.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isAuth: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    setPasswordRequest: PropTypes.func.isRequired,

    checkingValidity: PropTypes.bool.isRequired,
    isTokenValid: PropTypes.bool.isRequired,
    tokenValidityErrorStatus: PropTypes.number.isRequired,
    checkTokenValidity: PropTypes.func.isRequired,

    isSendingNewToken: PropTypes.bool.isRequired,
    newTokenSent: PropTypes.bool.isRequired,
    newTokenSendingFailed: PropTypes.bool.isRequired,
    errorMessageNewToken: PropTypes.string.isRequired,
    renewToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isLoading: state.auth.setPassword.isLoading,
    isAuth: state.auth.signin.isAuth,
    isError: state.auth.setPassword.isError,
    isSuccess: state.auth.setPassword.isSuccess,
    errorMessage: state.auth.setPassword.errorMessage,
    openSuccessDialog: state.auth.setPassword.openSuccessDialog,

    checkingValidity: state.auth.tokenValidity.isLoading,
    tokenValidityErrorStatus: state.auth.tokenValidity.errorStatus,
    isTokenValid: !state.auth.tokenValidity.isError,

    isSendingNewToken: state.auth.renewToken.isProcessing,
    newTokenSent: state.auth.renewToken.isSuccess,
    newTokenSendingFailed: state.auth.renewToken.isError,
    errorMessageNewToken: state.auth.renewToken.errorMessage,
});

export const SetPasswordContainer = withRouter(
    connect(mapStateToProps, {
        setPasswordRequest,
        setPasswordCloseDialog,
        checkTokenValidity,
        renewToken,
    })(SetPassword)
);
