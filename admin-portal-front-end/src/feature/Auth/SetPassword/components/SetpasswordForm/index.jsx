import React from "react";
import { Form } from "antd";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import {
  Avatar,
  CircularProgress,
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { whiteColor } from "assets/jss/material-dashboard-react";

const myStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    color: whiteColor,
  },
}));

const setPasswordFormComponent = (props) => {
  const classes = myStyles();
  const { getFieldDecorator } = props.form;

  const handleSubmit = (e) => {
    e.preventDefault();

    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        props.handleSubmit(values);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {props.isTokenValid ? "Set Password" : "Your Token has expired "}
        </Typography>
        <Form name="normal_login" onSubmit={handleSubmit}>
          {!props.isTokenValid && (
            <h3>
              Click the button to generate a new token
            </h3>
          )}
          {props.isTokenValid && (
            <>
              <Form.Item
                {...(props.passIsError && {
                  help: props.passErrorMessage,
                  validateStatus: "error",
                })}
                name="password"
                rules={[
                  { required: true, message: "Please enter your Password!" },
                ]}
              >
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your password!" },
                  ],
                })(
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
                )}
              </Form.Item>

              <Form.Item
                {...(!props.passwordsMatched && {
                  help: "Password do not match",
                  validateStatus: "error",
                })}
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Password again!",
                  },
                ]}
              >
                {getFieldDecorator("confirmPassword", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your password again!",
                    },
                  ],
                })(
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                  />
                )}
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {props.isTokenValid ? "Submit" : "Resend"}
            </Button>
            {props.isLoading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Form.Item>
        </Form>
      </div>
    </Container>
  );
};

export const SetPasswordForm = Form.create({ name: "setPasswordForm" })(
  setPasswordFormComponent
);
