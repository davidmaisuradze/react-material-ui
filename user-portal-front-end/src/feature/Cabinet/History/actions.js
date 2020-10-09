import { api } from "../../../helpers/api";

export const HISTORY_REQUEST_PROCESS = "HISTORY_REQUEST_PROCESS";
export const HISTORY_REQUEST_ERROR = "HISTORY_REQUEST_ERROR";
export const HISTORY_REQUEST_SUCCESS = "HISTORY_REQUEST_SUCCESS";

export const historyRequestProcess = () => ({
  type: HISTORY_REQUEST_PROCESS
});

export const historyRequestSuccess = data => ({
  type: HISTORY_REQUEST_SUCCESS,
  data
});

export const historyRequestError = error => ({
  type: HISTORY_REQUEST_ERROR,
  error
});

export const historyFetchRequest = () => async dispatch => {
  try {
    dispatch(historyRequestProcess());

    const data = await api("get", "history");

    dispatch(historyRequestSuccess(data));
  } catch (error) {
    dispatch(historyRequestError(error.response ? error.response.data : error));
  }
};
