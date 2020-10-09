import {
    REQUESTS_REQUEST_PROCESS,
    REQUESTS_REQUEST_ERROR,
    REQUESTS_REQUEST_SUCCESS, UPDATE_REQUEST_STATUS_PROCESS, UPDATE_REQUEST_STATUS_ERROR, UPDATE_REQUEST_STATUS_SUCCESS
} from './actions';

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    errorMessage: ''
};

export const requestsReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUESTS_REQUEST_PROCESS:
            return {...state, isError: false, errorMessage: '', isLoading: true};
        case REQUESTS_REQUEST_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.error.message
            };
        case REQUESTS_REQUEST_SUCCESS:
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        case UPDATE_REQUEST_STATUS_PROCESS:
            return {...state, isError: false, errorMessage: '', isLoading: true};
        case UPDATE_REQUEST_STATUS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.error.message
            };
        case UPDATE_REQUEST_STATUS_SUCCESS:
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        default:
            return state;
    }
};
