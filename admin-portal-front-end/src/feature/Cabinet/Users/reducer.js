import {
    ADMIN_USERS_REQUEST_PROCESS,
    ADMIN_USERS_REQUEST_ERROR,
    ADMIN_USERS_REQUEST_SUCCESS
} from './actions';

const initialState = {
    adminUsersData: [],
    isLoading: false,
    isError: false,
    errorMessage: ''
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_USERS_REQUEST_PROCESS:
            return {...state, isError: false, errorMessage: '', isLoading: true};
        case ADMIN_USERS_REQUEST_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.error.message
            };
        case ADMIN_USERS_REQUEST_SUCCESS:
            return {
                ...state,
                adminUsersData: action.data,
                isLoading: false
            };
        default:
            return state;
    }
};
