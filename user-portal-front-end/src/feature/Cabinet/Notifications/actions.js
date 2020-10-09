import { api } from '../../../helpers/api';

export const NOTIFICATION_REQUEST_PROCESS = 'NOTIFICATION_REQUEST_PROCESS';
export const NOTIFICATION_REQUEST_ERROR = 'NOTIFICATION_REQUEST_ERROR';
export const NOTIFICATION_REQUEST_SUCCESS = 'NOTIFICATION_REQUEST_SUCCESS';

export const MARK_NOTIFICATION_SEEN_PROCESS = 'MARK_NOTIFICATION_SEEN_PROCESS';
export const MARK_NOTIFICATION_SEEN_ERROR = 'MARK_NOTIFICATION_SEEN_ERROR';
export const MARK_NOTIFICATION_SEEN_SUCCESS = 'MARK_NOTIFICATION_SEEN_SUCCESS';

export const notificationRequestProcess = () => ({
    type: NOTIFICATION_REQUEST_PROCESS
});

export const notificationRequestSuccess = data => ({
    type: NOTIFICATION_REQUEST_SUCCESS,
    data
});

export const notificationRequestError = error => ({
    type: NOTIFICATION_REQUEST_ERROR,
    error
});

export const markNotificationSeenProcess = () => ({
    type: MARK_NOTIFICATION_SEEN_PROCESS
});

export const markNotificationSeenSuccess = data => ({
    type: MARK_NOTIFICATION_SEEN_SUCCESS,
    data
});

export const markNotificationSeenError = error => ({
    type: MARK_NOTIFICATION_SEEN_ERROR,
    error
});

export const notificationFetchRequest = () => async dispatch => {
    try {
        dispatch(notificationRequestProcess());

        const data = await api('get', 'notifications/list');

        dispatch(notificationRequestSuccess(data));
    } catch (error) {
        dispatch(notificationRequestError(error.response ? error.response.data : error));
    }
};

export const markNotificationSeenRequest = (id) => async dispatch => {
    try {
        dispatch(markNotificationSeenProcess());

        console.log(id, 'here');
        const data = await api('put', 'notifications/change-status', {
            id
        });

        dispatch(markNotificationSeenSuccess(data));
    } catch (error) {
        dispatch(markNotificationSeenError(error.response ? error.response.data : error));
    }
};
