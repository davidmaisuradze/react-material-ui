import { api } from '../../../helpers/api';

export const ADMIN_USERS_REQUEST_PROCESS = 'ADMIN_USERS_REQUEST_PROCESS';
export const ADMIN_USERS_REQUEST_ERROR = 'ADMIN_USERS_REQUEST_ERROR';
export const ADMIN_USERS_REQUEST_SUCCESS = 'ADMIN_USERS_REQUEST_SUCCESS';

export const adminUsersRequestProcess = () => ({
    type: ADMIN_USERS_REQUEST_PROCESS
});

export const adminUsersRequestSuccess = data => ({
    type: ADMIN_USERS_REQUEST_SUCCESS,
    data
});

export const adminUsersRequestError = error => ({
    type: ADMIN_USERS_REQUEST_ERROR,
    error
});

export const adminUsersFetchRequest = () => async dispatch => {
    try {
        dispatch(adminUsersRequestProcess());

        const data = await api('get', 'admin/users');

        dispatch(adminUsersRequestSuccess(data));
    } catch (error) {
        dispatch(adminUsersRequestError(error.response ? error.response.data : error));
    }
};
