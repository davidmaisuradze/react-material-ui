import React, { useEffect } from "react";
import { Form, Avatar, Typography } from "antd";
import {
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
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
  },
}));

const ChangePasswordFormComponent = (props) => {
  const classes = useStyles();
  const { getFieldDecorator } = props.form;

  useEffect(() => {
    props.form.resetFields();
  }, [props.isModalOpen]);

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
          Change Password
        </Typography>
        <Form name="normal_login"
        
        onSubmit={handleSubmit}>
          <Form.Item
            name="oldPassword"
            rules={[
              { required: true, message: "Please enter your old Password!" },
            ]}
            {...(props.isError && {
              help: props.errorMessage,
              validateStatus: "error",
            })}
          >
            {getFieldDecorator("oldPassword", {
              rules: [
                { required: true, message: "Please input your old password!" },
              ],
            })(
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="oldPassword"
                label="Old Password"
                type="password"
                id="oldPassword"
              
              />
            )}
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new Password!" },
            ]}
          >
            {getFieldDecorator("newPassword", {
              rules: [
                { required: true, message: "Please input your new password!" },
              ],
            })(
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
              />
            )}
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please enter your Password again!" },
            ]}
            {...(props.passwordNotMatched && {
              help: "Passwords do not match ",
              validateStatus: "error",
            })}
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
          <Form.Item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Change Password
            </Button>
          </Form.Item>
          {props.isLoading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
        </Form>
      </div>
    </Container>
  );
};

export const ChangePasswordForm = Form.create({ name: "changePasswordForm" })(
  ChangePasswordFormComponent
);
