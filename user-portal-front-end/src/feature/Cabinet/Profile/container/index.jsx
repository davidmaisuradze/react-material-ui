import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Select,
    MenuItem,
    Grid,
    Container,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import CheckoutSuccess from './CheckoutSuccess';
import {
    firstStepForIndividual,
    firstStepForNonIndividual, lastStep,
} from './FormModal/validationSchema';
import getInitialData from './FormModal/formInitialValues';
import StepContent from './stepContent';
import useStyles from './styles';
import {
    generateLocationAuthToken,
    getCountries,
} from '../../../API/locationActions';
import {
    uploadFormUploadRequest,
    uploadFormSuccessCloseModal,
    uploadFormCloseErrorModal,
    uploadFormAddFiles,
    uploadFormAddError,
} from '../actions';
import { userType, userTypeOptions } from '../../../../config/constants';
import ConfirmationDialog from '../../../Common/Dialog/ConfirmationDialog';
import AlertDialog from '../../../Common/Dialog/AlertDialog';
import LoadingAlertDialog from 'feature/Common/Dialog/LoadingAlertDialog';

const steps = ['Details', 'Uploads', 'Review'];

const getValidationSchema = (step, profile) => {
    let schema = null;

    switch (step) {
        case 0:
            schema =
                profile.type === userType.individual
                    ? firstStepForIndividual
                    : firstStepForNonIndividual;
            break;
        case 1:
            break;
        case 2:
            schema = lastStep;
            break;
        default:
    }

    return schema;
};

export const Profile = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [actions, setActions] = useState({});
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const isLastStep = activeStep === steps.length - 1;
    const {
        location,
        generateLocationAuthToken,
        getCountriesAction,
        profile,
    } = props;

    const handleConfirmConfirmationDialog = () => {
        props.uploadFormUploadRequest(formData);
        setConfirmDialogOpen(false);
    };

    const handleCloseConfirmationDialog = () => {
        setConfirmDialogOpen(false);
    };

    const handleCloseSuccessAlert = () => {
        props.uploadFormSuccessCloseModal();
        setActiveStep(0);
        actions.resetForm();
        setActions({});
        setFormData({});
    };

    const handleCloseErrorAlert = () => {
        props.uploadFormCloseErrorModal();
    };

    useEffect(() => {
        const getLocationAuthToken = async () => {
            if (!location.authToken) {
                return generateLocationAuthToken();
            }
        };

        const getCountries = async () => {
            const token = await getLocationAuthToken();
            if (token) {
                getCountriesAction();
            }
        };

        getCountries();
    }, [generateLocationAuthToken, getCountriesAction, location.authToken]);

    async function handleSubmit(values, actions) {
        if (isLastStep) {
            const data = new FormData();
            data.append('type', profile.type);
            Object.keys(props.files).forEach((key) => {
                if (props.files[key].length > 0) {
                    props.files[key].forEach((file) => {
                        data.append(key.slice(0, key.length - 1), file.originFileObj);
                    });
                }
            });
            Object.keys(values).forEach((key) => {
                data.append(key, values[key]);
            });

            setConfirmDialogOpen(true);
            setFormData(data);
            setActions(actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function handleBack() {
        setActiveStep(activeStep - 1);
    }

    return (
        <Container>
            <React.Fragment>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {activeStep === steps.length ? (
                        <CheckoutSuccess/>
                    ) : (
                        <Formik
                            initialValues={getInitialData(profile)}
                            validationSchema={getValidationSchema(activeStep, profile)}
                            onSubmit={handleSubmit}
                            validateOnBlur={true}
                            validateOnChange={false}
                        >
                            {({isSubmitting}) => (
                                <Form>
                                    <Grid container spacing={3} direction="row-reverse">
                                        <Grid item xs={12} sm={3}>
                                            <Select
                                                data={userTypeOptions}
                                                value={profile.type}
                                                disabled
                                                className={classes.typeSelector}
                                                fullWidth
                                            >
                                                {userTypeOptions.map((item, index) => (
                                                    <MenuItem value={item.value} key={index}>
                                                        {item.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Grid>
                                    </Grid>

                                    <StepContent
                                        step={activeStep}
                                        profile={profile}
                                        files={props.files}
                                        uploadFormAddError={props.uploadFormAddError}
                                        uploadFormAddFiles={props.uploadFormAddFiles}
                                    />

                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        <div className={classes.wrapper}>
                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                            >
                                                {isLastStep ? 'Place order' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}
                </React.Fragment>
            </React.Fragment>
            <ConfirmationDialog
                title={'Confirmation'}
                content={'Do you confirm that all of the data you entered is correct'}
                open={confirmDialogOpen}
                handleConfirm={handleConfirmConfirmationDialog}
                handleClose={handleCloseConfirmationDialog}
            />
            <AlertDialog
                title={'Thank you for your order.'}
                content={
                    'Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your order has shipped.'
                }
                open={props.successOpenModal}
                handleClose={handleCloseSuccessAlert}
            />
            <AlertDialog
                title={'Error'}
                content={props.uploadFormErrorMessage}
                open={props.errorOpenModal}
                handleClose={handleCloseErrorAlert}
            />
            <LoadingAlertDialog

                title={'Loading ...'}
                open={props.isUploadFormLoading}
            />
        </Container>
    );
};

Profile.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isUploadFormLoading: PropTypes.bool.isRequired,
    successOpenModal: PropTypes.bool.isRequired,
    users: PropTypes.array,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    isLoading: state.cabinet.users.isLoading,
    users: state.cabinet.users.data,
    profile: state.auth.signin.user,
    location: state.location,
    uploadFormData: state.cabinet.profile.UploadFormData,
    isUploadFormLoading: state.cabinet.profile.isUploadFormLoading,
    isUploadFormError: state.cabinet.profile.isUploadFormError,
    uploadFormErrorMessage: state.cabinet.profile.uploadFormErrorMessage,
    successOpenModal: state.cabinet.profile.successOpenModal,
    errorOpenModal: state.cabinet.profile.errorOpenModal,
    files: state.cabinet.files,
});

const mapDispatchToProps = {
    generateLocationAuthToken,
    uploadFormUploadRequest,
    uploadFormSuccessCloseModal,
    uploadFormCloseErrorModal,
    uploadFormAddFiles,
    uploadFormAddError,
    getCountriesAction: getCountries,
};

export const ProfileContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Profile)
);
