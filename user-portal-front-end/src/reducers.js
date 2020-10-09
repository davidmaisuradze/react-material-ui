import { combineReducers } from "redux";

import { authReducers } from "./feature/Auth";
import { cabinetReducers } from "./feature/Cabinet";
import { locationReducer } from "./feature/API/locationReducer";

export const reducers = combineReducers({
  auth: authReducers,
  cabinet: cabinetReducers,
  location: locationReducer,
});
