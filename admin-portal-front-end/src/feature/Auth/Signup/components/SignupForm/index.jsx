import React, { useEffect } from 'react';
import { Avatar, Typography, Form } from 'antd';
import {
    Button,
    Container,
    CssBaseline,
    makeStyles,
    TextField,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import GridContainer from '../../../../../components/Grid/GridContainer';
import GridItem from '../../../../../components/Grid/GridItem';
import { Link } from 'react-router-dom';

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
}));

const SignupFormComponent = (props) => {
    const classes = useStyles();
    const {getFieldDecorator} = props.form;

    useEffect(() => {
        props.form.resetFields();
    }, [props.isModalOpen]);

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
                    Get onboard with us..
                </Typography>
                <Form name="normal_login" onSubmit={handleSubmit}>
                    <Form.Item
                        name="name"
                        rules={[{required: true, message: 'Please enter your name'}]}
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                {required: true, message: 'Please input your name!'},
                                {min: 2, message: 'Min length name 2 symbols!'},
                                {max: 30, message: 'Max length name 30 symbols!'},
                            ],
                        })(
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoFocus
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{required: true, message: 'Please enter your Email'}]}
                        {...(props.isError && {
                            help: props.errorMessage,
                            validateStatus: 'error',
                        })}
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
                                autoFocus
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
                            Sign Up
                        </Button>
                    </Form.Item>
                    <GridContainer>
                        <GridItem xs>
                            <Link to="/restore-password" variant="body2">
                                Forgot password?
                            </Link>
                        </GridItem>
                        <GridItem>
                            <Link to="/" variant="body2">
                                Have an account?
                            </Link>
                        </GridItem>
                    </GridContainer>
                </Form>
            </div>
        </Container>
    );
};

export const SignupForm = Form.create({name: 'signupForm'})(
    SignupFormComponent
);
