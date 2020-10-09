import React from 'react';
import { Form, Avatar, Typography } from 'antd';
import { Link } from 'react-router-dom';
import {
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    makeStyles,
    TextField,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import GridContainer from '../../../../../components/Grid/GridContainer';
import GridItem from '../../../../../components/Grid/GridItem';
import { whiteColor } from 'assets/jss/material-dashboard-react';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        color: whiteColor
    },
}));

const SigninFormComponent = (props) => {
    const classes = useStyles();
    const {getFieldDecorator} = props.form;

    const handleSubmit = (e) => {
        e.preventDefault();

        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                props.onSubmit(values);
            }
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Welcome Back!
                </Typography>
                <Form
                    name="normal_login"
                    onSubmit={handleSubmit}
                >
                    <Form.Item
                        name="email"
                        rules={[{required: true, message: 'Please enter your Email'}]}
                    >
                        {getFieldDecorator('email', {
                            rules: [
                                {required: true, message: 'Please input your email!'},
                                {type: 'email', message: 'The input is not valid E-mail!'},
                            ],
                        })(
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please enter your Password!'}]}
                        {...(props.isError && {
                            help: props.errorMessage,
                            validateStatus: 'error',
                        })}
                    >
                        {getFieldDecorator('password', {
                            rules: [
                                {required: true, message: 'Please input your password!'},
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
                                autoComplete="current-password"
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
                            Sign In
                        </Button>
                        {props.isLoading && (
                            <CircularProgress size={24} className={classes.buttonProgress}/>
                        )}
                    </Form.Item>


                    <GridContainer>
                        <GridItem xs>
                            <Link to="/restore-password" variant="body2">
                                Forgot password?
                            </Link>
                        </GridItem>
                        <GridItem>
                            <Link to="/signup" variant="body2">
                                {'Don\'t have an account? Sign Up'}
                            </Link>
                        </GridItem>
                    </GridContainer>
                </Form>
            </div>
        </Container>
    );
};

export const SigninForm = Form.create({name: 'signinForm'})(
    SigninFormComponent
);
