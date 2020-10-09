import {
    LOCATION_GENERATE_AUTH_TOKEN,
    LOCATION_GENERATE_AUTH_TOKEN_ERROR,
    LOCATION_GENERATE_AUTH_TOKEN_SUCCESS,

    LOCATION_GET_COUNTRIES,
    LOCATION_GET_COUNTRIES_ERROR,
    LOCATION_GET_COUNTRIES_SUCCESS,

    LOCATION_GET_STATES,
    LOCATION_GET_STATES_ERROR,
    LOCATION_GET_STATES_SUCCESS,

    LOCATION_GET_CITIES,
    LOCATION_GET_CITIES_ERROR,
    LOCATION_GET_CITIES_SUCCESS,
} from './locationActions';

const initialState = {
    countries: [],
    states: [],
    cities: [],
    authToken: null,
    isLoading: false,
    isError: false,
    errorMessage: ''
};

export const locationReducer = (state = initialState, action) => {
    const {data} = action;

    switch (action.type) {
        case LOCATION_GENERATE_AUTH_TOKEN:
        case LOCATION_GET_COUNTRIES:
        case LOCATION_GET_STATES:
        case LOCATION_GET_CITIES:
            return {...state, isError: false, errorMessage: '', isLoading: true};

        case LOCATION_GENERATE_AUTH_TOKEN_ERROR:
        case LOCATION_GET_COUNTRIES_ERROR:
        case LOCATION_GET_STATES_ERROR:
        case LOCATION_GET_CITIES_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.error.message
            };

        case LOCATION_GENERATE_AUTH_TOKEN_SUCCESS:
            return {
                ...state,
                authToken: data.token,
                isLoading: false
            };
        case LOCATION_GET_COUNTRIES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                countries: data,
                states: [],
                cities: []
            };
        }
        case LOCATION_GET_STATES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                states: data,
                cities: []
            };
        }
        case LOCATION_GET_CITIES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                cities: data,
            };
        }
        default:
            return state;
    }
};
