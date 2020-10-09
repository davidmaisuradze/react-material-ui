import {
  PROFILE_REQUEST_PROCESS,
  PROFILE_REQUEST_ERROR,
  PROFILE_REQUEST_SUCCESS,
  UPLOAD_FORM_REQUEST_PROCESS,
  UPLOAD_FORM_REQUEST_ERROR,
  UPLOAD_FORM_REQUEST_SUCCESS,
  UPLOAD_FORM_ERROR_CLOSE_MODAL,
  UPLOAD_FORM_SUCCESS_CLOSE_MODAL,
  UPLOAD_FORM_ADD_PASSPORT_FILES,
  UPLOAD_FORM_ADD_DRIVING_LICENSE_FILES,
  UPLOAD_FORM_ADD_NOTHING_FILES,
  UPLOAD_FORM_ADD_ASSIGNMENT_FILES,
  UPLOAD_FORM_ADD_OTHER_FILES,
  UPLOAD_FORM_ADD_ANOTHER_FILES,
  UPLOAD_FORM_RESET_FILES

} from "./actions";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
  uploadFormData: [],
  isUploadFormLoading: false,
  isUploadFormError: false,
  uploadFormErrorMessage: "",
  successOpenModal: false,
  errorOpenModal: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_REQUEST_PROCESS:
      return { ...state, isError: false, errorMessage: "", isLoading: true };
    case PROFILE_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.message
      };
    case PROFILE_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false
      };
    case UPLOAD_FORM_REQUEST_PROCESS:
      return { ...state, isUploadFormError: false, uploadFormErrorMessage: "", isUploadFormLoading: true };
    case UPLOAD_FORM_REQUEST_ERROR:
      return {
        ...state,
        isUploadFormLoading: false,
        isUploadFormError: true,
        uploadFormErrorMessage: action.error.message,
        errorOpenModal: true
      };
    case UPLOAD_FORM_REQUEST_SUCCESS:
      return {
        ...state,
        uploadFormData: action.data,
        isUploadFormLoading: false,
        successOpenModal: true,
      };
    case UPLOAD_FORM_ERROR_CLOSE_MODAL:
      return {
        ...state, errorOpenModal: false
      };
    case UPLOAD_FORM_SUCCESS_CLOSE_MODAL:
      return {
        ...state, successOpenModal: false
      };

    default:
      return state;
  }
}

const initialFilesState = {
  nothingFiles: [],
  assignmentFiles: [],
  otherFiles: [],
  anotherFiles: [],
  passportFiles: [],
  drivingLicenseFiles: [],

}
export const fileReducer = (state = initialFilesState, action) => {
  switch (action.type) {
    case UPLOAD_FORM_ADD_NOTHING_FILES:
      return { ...state, nothingFiles: action.data }
    case UPLOAD_FORM_ADD_ASSIGNMENT_FILES:
      return { ...state, assignmentFiles: action.data }
    case UPLOAD_FORM_ADD_OTHER_FILES:
      return { ...state, otherFiles: action.data }
    case UPLOAD_FORM_ADD_ANOTHER_FILES:
      return { ...state, anotherFiles: action.data }
    case UPLOAD_FORM_ADD_PASSPORT_FILES:
      return { ...state, passportFiles: action.data }
    case UPLOAD_FORM_ADD_DRIVING_LICENSE_FILES:
      return { ...state, drivingLicenseFiles: action.data }
    case UPLOAD_FORM_RESET_FILES:
      return { ...initialFilesState }
    default: return state;
  }
}
