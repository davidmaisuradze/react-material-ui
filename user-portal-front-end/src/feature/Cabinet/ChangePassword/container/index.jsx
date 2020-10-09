import React, { useState } from "react";
import PropTypes from "prop-types";
import { ChangePasswordForm } from "../components/ChangePasswordForm";
import { connect } from "react-redux";
import { changePasswordRequest, changePasswordCloseModal } from "../actions";
import { withRouter } from "react-router-dom";
import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const ChangePassword = (props) => {

  const handleCloseDialog = () => {
    props.changePasswordCloseModal();
    // props.history.push("/admin/home");
  };

  const [passwordNotMatched, setPasswordNotMatched] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      setPasswordNotMatched(true);
    } else {
      setPasswordNotMatched(false);
      props.changePasswordRequest(values);
    }
  };

  return (
    <Container>
      <ChangePasswordForm
        handleSubmit={handleSubmit}
        passwordNotMatched={passwordNotMatched}
        isLoading={props.isLoading}
        isModalOpen={props.isModalOpen}
        isError={props.isError}
        errorMessage={props.errorMessage}
      />
      <Dialog
        fullScreen={fullScreen}
        open={props.isModalOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Change Password?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your password has changed successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary" onClick={handleCloseDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

ChangePassword.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  changePasswordRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.cabinet.changePassword.isLoading,
  isError: state.cabinet.changePassword.isError,
  isModalOpen: state.cabinet.changePassword.isModalOpen,
  isSuccess: state.cabinet.changePassword.isSuccess,
  errorMessage: state.cabinet.changePassword.errorMessage,
});

export const ChangePasswordContainer = withRouter(
  connect(mapStateToProps, { changePasswordRequest, changePasswordCloseModal })(ChangePassword)
);
