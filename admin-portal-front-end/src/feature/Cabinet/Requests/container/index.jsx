import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestsFetchRequest, updateRequestStatusRequest } from '../actions';
import { RequestsList } from './RequestsList';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery, useTheme
} from '@material-ui/core';
import ConfirmationDialog from '../../../Common/Dialog/ConfirmationDialog';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { ProfileStatuses } from '../../../../constants';

export const Requests = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [userIdToApprove, setUserIdToApprove] = useState(null);
    const [userIdToReject, setUserIdToReject] = useState(null);
    const [rejectReason, setRejectReason] = useState('');

    useEffect(() => {
        props.requestsFetchRequest();
        // eslint-disable-next-line
    }, [props.requestsFetchRequest]);

    const onHandleApproveClicked = (userId) => {
        if (userId) {
            setUserIdToApprove(userId);
            setConfirmDialogOpen(true);
        }
    };

    const onHandleConfirmConfirmationDialog = () => {
        if (userIdToApprove) {
            props.updateRequestStatusRequest(userIdToApprove, ProfileStatuses.APPROVED);
            setConfirmDialogOpen(false);
        }
    };

    const onHandleCloseConfirmationDialog = () => {
        setConfirmDialogOpen(false);
    };

    const onHandleRejectClicked = (userId) => {
        if (userId) {
            setUserIdToReject(userId);
            setRejectDialogOpen(true);
        }
    };

    const onHandleRejectConfirmed = () => {
        if (userIdToReject) {
            props.updateRequestStatusRequest(userIdToReject, ProfileStatuses.REJECTED, rejectReason);
            setRejectDialogOpen(false);
        }
    };

    const onHandleRejectDialogClose = () => {
        setRejectDialogOpen(false);
    };

    return (
        <div>
            <RequestsList requests={props.requests}
                          isLoading={props.isLoading}
                          handleApproveClicked={onHandleApproveClicked}
                          handleRejectClicked={onHandleRejectClicked}
            />
            <ConfirmationDialog
                title={'Confirmation'}
                content={'Do you confirm that you want to approve this request?'}
                open={confirmDialogOpen}
                handleConfirm={onHandleConfirmConfirmationDialog}
                handleClose={onHandleCloseConfirmationDialog}
            />
            <Dialog
                fullScreen={fullScreen}
                open={rejectDialogOpen}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {'Reject request?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Write shortly why are you rejecting request?
                    </DialogContentText>
                    <TextareaAutosize
                        cols={80}
                        rows={4}
                        value={rejectReason}
                        onChange={e => setRejectReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color="primary" onClick={onHandleRejectDialogClose}>
                        Close
                    </Button>
                    <Button autoFocus color="secondary" onClick={onHandleRejectConfirmed}>
                        Reject
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

Requests.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    requests: PropTypes.array,
    requestsFetchRequest: PropTypes.func.isRequired,
    updateRequestStatusRequest: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isLoading: state.cabinet.requests.isLoading,
    requests: state.cabinet.requests.data,
});

export const RequestsContainer = withRouter(
    connect(mapStateToProps, {requestsFetchRequest, updateRequestStatusRequest})(Requests)
);
