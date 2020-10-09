import { api, upload } from "../../../helpers/api";

export const PROFILE_REQUEST_PROCESS = "PROFILE_REQUEST_PROCESS";
export const PROFILE_REQUEST_ERROR = "PROFILE_REQUEST_ERROR";
export const PROFILE_REQUEST_SUCCESS = "PROFILE_REQUEST_SUCCESS";

export const UPLOAD_FORM_REQUEST_PROCESS = 'UPLOAD_FORM_REQUEST_PROCESS';
export const UPLOAD_FORM_REQUEST_ERROR = 'UPLOAD_FORM_REQUEST_ERROR';
export const UPLOAD_FORM_REQUEST_SUCCESS = 'UPLOAD_FORM_REQUEST_SUCCESS';
export const UPLOAD_FORM_SUCCESS_CLOSE_MODAL = 'UPLOAD_FORM_SUCCESS_CLOSE_MODAL';
export const UPLOAD_FORM_ERROR_CLOSE_MODAL = 'UPLOAD_FORM_ERROR_CLOSE_MODAL';

export const UPLOAD_FORM_ADD_PASSPORT_FILES = 'UPLOAD_FORM_ADD_PASSPORT_FILES';
export const UPLOAD_FORM_ADD_DRIVING_LICENSE_FILES = 'UPLOAD_FORM_ADD_DRIVING_LICENSE_FILES';
export const UPLOAD_FORM_ADD_NOTHING_FILES = 'UPLOAD_FORM_ADD_NOTHING_FILES';
export const UPLOAD_FORM_ADD_ASSIGNMENT_FILES = 'UPLOAD_FORM_ADD_ASSIGNMENT_FILES';
export const UPLOAD_FORM_ADD_OTHER_FILES = 'UPLOAD_FORM_ADD_OTHER_FILES';
export const UPLOAD_FORM_ADD_ANOTHER_FILES = 'UPLOAD_FORM_ADD_ANOTHER_FILES';
export const UPLOAD_FORM_RESET_FILES = 'UPLOAD_FORM_RESET_FILES';
export const UPLOAD_FORM_FILES_ERROR = 'UPLOAD_FORM_FILES_ERROR';

export const profileRequestProcess = () => ({
  type: PROFILE_REQUEST_PROCESS
});

export const profileRequestSuccess = data => ({
  type: PROFILE_REQUEST_SUCCESS,
  data
});

export const profileRequestError = error => ({
  type: PROFILE_REQUEST_ERROR,
  error
});

export const uploadFormRequestError = error => ({
  type: UPLOAD_FORM_REQUEST_ERROR,
  error
});

export const uploadFormRequestSuccess = data => async dispatch => {
  dispatch(uploadFormResetFiles());
  dispatch({
    type: UPLOAD_FORM_REQUEST_SUCCESS,
    data
  })
};

export const uploadFormRequestProcess = () => ({
  type: UPLOAD_FORM_REQUEST_PROCESS
});

export const uploadFormCloseErrorModal = () => ({
  type: UPLOAD_FORM_ERROR_CLOSE_MODAL
});

export const uploadFormSuccessCloseModal = () => ({
  type: UPLOAD_FORM_SUCCESS_CLOSE_MODAL
});

export const uploadFormAddNothigFiles = (data) => ({
  type: UPLOAD_FORM_ADD_NOTHING_FILES,
  data: data
});

export const uploadFormAddAssignmentFiles = (data) => ({
  type: UPLOAD_FORM_ADD_ASSIGNMENT_FILES,
  data: data
});

export const uploadFormAddOtherFiles = (data) => ({
  type: UPLOAD_FORM_ADD_OTHER_FILES,
  data: data
});

export const uploadFormAddAnotherFiles = (data) => ({
  type: UPLOAD_FORM_ADD_ANOTHER_FILES,
  data: data
});

export const uploadFormAddPassportFiles = (data) => ({
  type: UPLOAD_FORM_ADD_PASSPORT_FILES,
  data: data
});

export const uploadFormAddDrivingLicenseFiles = (data) => ({
  type: UPLOAD_FORM_ADD_DRIVING_LICENSE_FILES,
  data: data
});

export const uploadFormResetFiles = () => ({
  type: UPLOAD_FORM_RESET_FILES
});

export const uploadFormAddError = (name) => async dispatch => {
  dispatch(uploadFormRequestError({ message: name }));
}


export const uploadFormAddFiles = (name, data) => async dispatch => {
  switch (name) {
    case 'nothingFile':
      dispatch(uploadFormAddNothigFiles(data));
      break;
    case 'assignmentFile':
      dispatch(uploadFormAddAssignmentFiles(data));
      break;
    case 'otherFile':
      dispatch(uploadFormAddOtherFiles(data));
      break;
    case 'anotherFile':
      dispatch(uploadFormAddAnotherFiles(data));
      break;
    case 'passportFile':
      dispatch(uploadFormAddPassportFiles(data));
      break;
    case 'drivingLicenseFile':
      dispatch(uploadFormAddDrivingLicenseFiles(data));
      break;
    default: break;
  }
}
export const profileFetchRequest = () => async dispatch => {
  try {
    dispatch(profileRequestProcess());

    const data = await api("get", "users");

    dispatch(profileRequestSuccess(data));
  } catch (error) {
    dispatch(profileRequestError(error.response ? error.response.data : error));
  }
};

export const uploadFormUploadRequest = (formData) => async dispatch => {
  try {
    dispatch(uploadFormRequestProcess());

    const data = await upload("/upload", formData);
    dispatch(uploadFormRequestSuccess(data));
  } catch (error) {
    dispatch(uploadFormRequestError(error.response ? error.response.data : error));
  }
};
