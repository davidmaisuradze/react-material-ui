import {
  HISTORY_REQUEST_PROCESS,
  HISTORY_REQUEST_ERROR,
  HISTORY_REQUEST_SUCCESS
} from "./actions";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  errorMessage: ""
};

export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY_REQUEST_PROCESS:
      return { ...state, isError: false, errorMessage: "", isLoading: true };
    case HISTORY_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.message
      };
    case HISTORY_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false
      };
    default:
      return state;
  }
};
