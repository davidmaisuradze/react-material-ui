import {
  CHANGE_PASSWORD_REQUEST_PROCESS,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_REQUEST_ERROR,
  CHANGE_PASSWORD_OPEN_MODEL,
  CHANGE_PASSWORD_CLOSE_MODEL
} from "./actions";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isModalOpen: false,
  errorMessage: ""
};

export const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST_PROCESS:
      return { ...state, isError: false, errorMessage: "", isLoading: true };
    case CHANGE_PASSWORD_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: action.error.message
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        isSuccess: true
      };
    case CHANGE_PASSWORD_OPEN_MODEL:
      return {
        ...state, isModalOpen: true
      };
    case CHANGE_PASSWORD_CLOSE_MODEL:
      return {
        ...state, ...initialState
      };
    default:
      return state;
  }
};
