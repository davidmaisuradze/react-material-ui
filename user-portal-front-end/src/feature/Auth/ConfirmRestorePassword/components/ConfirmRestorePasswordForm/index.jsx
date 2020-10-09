import React from "react";
import { Form } from "antd";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import {
  Container,
  Avatar,
  Typography,
  CssBaseline,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";

const styles = makeStyles((theme) => ({
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
}));

const confirmRestorePasswordForm = (props) => {
  const classes = styles();
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
          Reset Password!
        </Typography>
        <Form name="normal_login" onSubmit={handleSubmit}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your Password!" }]}
            {...(props.isError && {
              help: props.errorMessage,
              validateStatus: "error",
            })}
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Container>
  );
};

export const ConfirmRestorePasswordForm = Form.create({
  name: "confirmRestorePasswordForm",
})(confirmRestorePasswordForm);
