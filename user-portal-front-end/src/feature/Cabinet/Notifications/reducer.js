import {
    NOTIFICATION_REQUEST_PROCESS,
    NOTIFICATION_REQUEST_ERROR,
    NOTIFICATION_REQUEST_SUCCESS,
    MARK_NOTIFICATION_SEEN_PROCESS,
    MARK_NOTIFICATION_SEEN_ERROR,
    MARK_NOTIFICATION_SEEN_SUCCESS
} from './actions';

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    errorMessage: ''
};

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_REQUEST_PROCESS:
            return {...state, isError: false, errorMessage: '', isLoading: true};
        case NOTIFICATION_REQUEST_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.error.message
            };
        case NOTIFICATION_REQUEST_SUCCESS:
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        case MARK_NOTIFICATION_SEEN_PROCESS:
            return {...state, isError: false, errorMessage: '', isLoading: true};
        case MARK_NOTIFICATION_SEEN_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.error.message
            };
        case MARK_NOTIFICATION_SEEN_SUCCESS:
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        default:
            return state;
    }
};
