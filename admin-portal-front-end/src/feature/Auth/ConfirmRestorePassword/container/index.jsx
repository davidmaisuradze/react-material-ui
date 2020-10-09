import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    confirmRestorePasswordRequest,
    verifyRestorePasswordToken,
} from '../actions';
import { ConfirmRestorePasswordForm } from '../components/ConfirmRestorePasswordForm';
import { Loader } from '../../../Common/Loader';
import { Container } from '@material-ui/core';
import AlertDialog from 'feature/Common/Dialog/AlertDialog';

class ConfirmRestorePassword extends React.Component {
    state = {passwordNotMatched: false};

    handleClose = () => {
        this.props.history.push('/');
    }

    componentDidMount() {
        this.props.isAuth && this.props.history.push('/admin/home');
        const token = this.props.match.params.token;
        const id = this.props.match.params.id;
        this.props.verifyRestorePasswordToken({token: token, id: id});
    }

    handleSubmit = (values) => {
        const token = this.props.match.params.token;
        const id = this.props.match.params.id;
        if (values.password !== values.confirmPassword) {
            this.setState({passwordNotMatched: true});
        } else {
            this.setState({passwordNotMatched: false});
            token &&
            this.props.confirmRestorePasswordRequest({
                token: token,
                id: id,
                password: values.password,
            });
        }
    };

    render() {
        return (
            <Container>
                <Loader isLoading={this.props.verifyingToken}>
                    <ConfirmRestorePasswordForm
                        handleSubmit={this.handleSubmit}
                        passwordNotMatched={this.state.passwordNotMatched}
                        isError={this.props.isError}
                        errorMessage={this.props.errorMessage}
                    />
                    <AlertDialog
                        title={'Success'}
                        content={'Password has changed.'}
                        open={this.props.isSuccess}
                        handleClose={this.handleClose}
                    />
                    <AlertDialog
                        title={'Error'}
                        content={this.props.errorMessage}
                        open={!this.props.verifiedToken || !this.props.tokenValid}
                        handleClose={this.handleClose}
                    />
                </Loader>
            </Container>
        );
    }
}

ConfirmRestorePassword.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isAuth: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    confirmRestorePasswordRequest: PropTypes.func.isRequired,
    verifyRestorePasswordToken: PropTypes.func.isRequired,
    tokenValid: PropTypes.func.isRequired,
    verifyingToken: PropTypes.func.isRequired,
    verifiedToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isLoading: state.auth.confirmRestorePassword.isLoading,
    isAuth: state.auth.signin.isAuth,
    isError: state.auth.confirmRestorePassword.isError,
    isSuccess: state.auth.confirmRestorePassword.isSuccess,
    errorMessage: state.auth.confirmRestorePassword.errorMessage,
    tokenValid: state.auth.confirmRestorePassword.tokenValid,
    verifyingToken: state.auth.confirmRestorePassword.verifyingToken,
    verifiedToken: state.auth.confirmRestorePassword.verifiedToken,
});

export const ConfirmRestorePasswordContainer = withRouter(
    connect(mapStateToProps, {
        confirmRestorePasswordRequest,
        verifyRestorePasswordToken,
    })(ConfirmRestorePassword)
);
