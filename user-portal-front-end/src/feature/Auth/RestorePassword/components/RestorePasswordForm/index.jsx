import React from 'react';
import { Form, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
    Container,
    CssBaseline,
    makeStyles,
    Button,
    Typography,
    TextField,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import GridContainer from '../../../../../components/Grid/GridContainer';
import GridItem from '../../../../../components/Grid/GridItem';

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

const RestorePasswordFormComponent = (props) => {
    const {getFieldDecorator} = props.form;
    const classes = useStyles();
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
                    Restore password
                </Typography>
                <Form name="normal_login" onSubmit={handleSubmit}>

                    <Form.Item
                        {...props.isError && {
                            help: props.errorMessage,
                            validateStatus: 'error',
                        }}
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

                    <Form.Item>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Restore
                        </Button>
                    </Form.Item>

                    <GridContainer>
                        <GridItem xs>
                            <Link to="/" variant="body2">
                                Sign in
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

export const RestorePasswordForm = Form.create({name: 'restoreForm'})(
    RestorePasswordFormComponent
);
