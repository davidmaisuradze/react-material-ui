import { api } from '../../../helpers/api';

export const REQUESTS_REQUEST_PROCESS = 'REQUESTS_REQUEST_PROCESS';
export const REQUESTS_REQUEST_ERROR = 'REQUESTS_REQUEST_ERROR';
export const REQUESTS_REQUEST_SUCCESS = 'REQUESTS_REQUEST_SUCCESS';

export const UPDATE_REQUEST_STATUS_PROCESS = 'UPDATE_REQUEST_STATUS_PROCESS';
export const UPDATE_REQUEST_STATUS_ERROR = 'UPDATE_REQUEST_STATUS_ERROR';
export const UPDATE_REQUEST_STATUS_SUCCESS = 'UPDATE_REQUEST_STATUS_SUCCESS';

export const requestsRequestProcess = () => ({
    type: REQUESTS_REQUEST_PROCESS
});

export const requestsRequestSuccess = data => ({
    type: REQUESTS_REQUEST_SUCCESS,
    data
});

export const requestsRequestError = error => ({
    type: REQUESTS_REQUEST_ERROR,
    error
});

export const updateRequestStatusProcess = () => ({
    type: UPDATE_REQUEST_STATUS_PROCESS
});

export const updateRequestStatusSuccess = data => ({
    type: UPDATE_REQUEST_STATUS_SUCCESS,
    data
});

export const updateRequestStatusError = error => ({
    type: UPDATE_REQUEST_STATUS_ERROR,
    error
});


export const requestsFetchRequest = () => async dispatch => {
    try {
        dispatch(requestsRequestProcess());

        const data = await api('get', 'admin/user-profile/requests');

        dispatch(requestsRequestSuccess(data));
    } catch (error) {
        dispatch(requestsRequestError(error.response ? error.response.data : error));
    }
};

export const updateRequestStatusRequest = (profileId, status, reason = '') => async dispatch => {
    try {
        dispatch(updateRequestStatusProcess());

        const data = await api('put', 'admin/user-profile/update-status', {
            id: profileId,
            status,
            reason
        });

        dispatch(updateRequestStatusSuccess(data));
    } catch (error) {
        dispatch(updateRequestStatusError(error.response ? error.response.data : error));
    }
};
