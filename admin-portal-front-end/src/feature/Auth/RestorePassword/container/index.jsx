import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { RestorePasswordForm } from "../components/RestorePasswordForm";
import { connect } from "react-redux";
import { restorePasswordRequest, restoreCloseAlertDialog } from "../actions";
import { withRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import AlertDialog from "feature/Common/Dialog/AlertDialog";

const RestorePassword = (props) => {
  useEffect(() => {
    props.isAuth && props.history.push("/admin/home");
  });

  const handleCloseAlertDialog = () => {
    props.restoreCloseAlertDialog();
    props.history.push('/');
  };

  return (
    <Container>
      <RestorePasswordForm
        onSubmit={props.restorePasswordRequest}
        isLoading={props.isLoading}
        isError={props.isError}
        errorMessage={props.errorMessage}
      />
      <AlertDialog
        title={"Success."}
        content={"Link for restore password is sent to your email address."}
        open={props.openSuccessDialog}
        handleClose={handleCloseAlertDialog}
      />
    </Container>
  );
};

RestorePassword.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  restorePasswordRequest: PropTypes.func.isRequired,
  openSuccessDialog: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.restorePassword.isLoading,
  isAuth: state.auth.signin.isAuth,
  isError: state.auth.restorePassword.isError,
  isSuccess: state.auth.restorePassword.isSuccess,
  errorMessage: state.auth.restorePassword.errorMessage,
  openSuccessDialog: state.auth.restorePassword.openSuccessDialog,
});

export const RestorePasswordContainer = withRouter(
  connect(mapStateToProps, { restorePasswordRequest, restoreCloseAlertDialog })(RestorePassword)
);
