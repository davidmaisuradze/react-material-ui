import {
  RESTORE_REQUEST_PROCESS,
  RESTORE_REQUEST_ERROR,
  RESTORE_SUCCESS,
  RESTORE_SUCCESS_CLOSE_DIALOG
} from "./actions";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  errorMessage: "",
  openSuccessDialog: false
};

export const restorePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_REQUEST_PROCESS:
      return { ...state, isError: false, errorMessage: "", isLoading: true };
    case RESTORE_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.message
      };
    case RESTORE_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        openSuccessDialog: true
      };

    case RESTORE_SUCCESS_CLOSE_DIALOG:
      return {
        ...state,
        openSuccessDialog: false
      };
    default:
      return state;
  }
};
