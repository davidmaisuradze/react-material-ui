import { api } from '../../../helpers/api';

export const SIGNUP_REQUEST_PROCESS = 'SIGNUP_REQUEST_PROCESS';
export const SIGNUP_REQUEST_ERROR = 'SIGNUP_REQUEST_ERROR';
export const SIGNUP_SUCCESS = 'SIGNUP_REQUEST_SUCCESS';
export const SIGNUP_SUCCESS_CLOSE_DIALOG = 'SIGNUP_SUCCESS_CLOSE_DIALOG';

export const signupRequestProcess = () => ({type: SIGNUP_REQUEST_PROCESS});
export const signupCloseDialog = () => ({type: SIGNUP_SUCCESS_CLOSE_DIALOG});

export const signupSuccess = data => ({
    type: SIGNUP_SUCCESS,
    data
});

export const signupRequestError = error => ({
    type: SIGNUP_REQUEST_ERROR,
    error
});

export const signupRequest = formData => async dispatch => {
    try {
        dispatch(signupRequestProcess());

        const data = await api('post', 'admin/auth/signup', formData);

        dispatch(signupSuccess(data));
    } catch (error) {
        dispatch(signupRequestError(error.response ? error.response.data : error));
    }
};
