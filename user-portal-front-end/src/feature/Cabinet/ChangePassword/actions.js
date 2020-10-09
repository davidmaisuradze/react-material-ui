import { api } from "../../../helpers/api";

export const CHANGE_PASSWORD_REQUEST_PROCESS = "CHANGE_PASSWORD_REQUEST_PROCESS";
export const CHANGE_PASSWORD_REQUEST_ERROR = "CHANGE_PASSWORD_REQUEST_ERROR";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_OPEN_MODEL = "CHANGE_PASSWORD_OPEN_MODEL";
export const CHANGE_PASSWORD_CLOSE_MODEL = "CHANGE_PASSWORD_CLOSE_MODEL";

export const changePasswordRequestProcess = () => ({ type: CHANGE_PASSWORD_REQUEST_PROCESS });
export const changePasswordCloseModal = () => ({ type: CHANGE_PASSWORD_CLOSE_MODEL });
export const changePasswordOpenModal = () => ({ type: CHANGE_PASSWORD_OPEN_MODEL });

export const changePasswordSuccess = data => async dispatch => {
  dispatch(changePasswordOpenModal());
  dispatch({
    type: CHANGE_PASSWORD_SUCCESS,
      data
  });
};
export const changePasswordRequestError = error => ({
  type: CHANGE_PASSWORD_REQUEST_ERROR,
  error
});

export const changePasswordRequest = formData => async dispatch => {
  try {
    dispatch(changePasswordRequestProcess());
    const data = await api("post", "/changePassword", formData);
    dispatch(changePasswordSuccess(data));
  } catch (error) {
    dispatch(changePasswordRequestError(error.response ? error.response.data : error));
  }
};
