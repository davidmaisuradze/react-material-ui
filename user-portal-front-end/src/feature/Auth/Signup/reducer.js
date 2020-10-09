import {
  SIGNUP_REQUEST_PROCESS,
  SIGNUP_REQUEST_ERROR,
  SIGNUP_SUCCESS, SIGNUP_SUCCESS_CLOSE_DIALOG
} from "./actions";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  errorMessage: "",
  openSuccessDialog: false
};

export const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST_PROCESS:
      return { ...state, isError: false, errorMessage: "", isLoading: true };
    case SIGNUP_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.message
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        openSuccessDialog: true
      };
    case SIGNUP_SUCCESS_CLOSE_DIALOG:
      return {
        ...state,
        openSuccessDialog: false
      };
    default:
      return state;
  }
};
