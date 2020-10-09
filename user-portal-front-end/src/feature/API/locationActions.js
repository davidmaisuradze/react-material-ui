import axios from "axios";
import app from "../../config/app";
import { setLocationData, removeLocationData, getLocationData } from "../../helpers/location";

export const LOCATION_GENERATE_AUTH_TOKEN = "LOCATION_GENERATE_AUTH_TOKEN";
export const LOCATION_GENERATE_AUTH_TOKEN_SUCCESS = "LOCATION_GENERATE_AUTH_TOKEN_SUCCESS";
export const LOCATION_GENERATE_AUTH_TOKEN_ERROR = "LOCATION_GENERATE_AUTH_TOKEN_ERROR";

export const generateLocationAuthTokenProcess = () => ({
  type: LOCATION_GENERATE_AUTH_TOKEN
});

export const generateLocationAuthTokenSuccess = data => ({
  type: LOCATION_GENERATE_AUTH_TOKEN_SUCCESS,
  data
});

export const generateLocationAuthTokenError = error => ({
  type: LOCATION_GENERATE_AUTH_TOKEN_ERROR,
  error
});

export const generateLocationAuthToken = () => async (dispatch, getState) => {
  let token = null;
  console.log(app, 'app')
  try {
    dispatch(generateLocationAuthTokenProcess());

    if(getLocationData()) {
      token = getLocationData();
    } else {
      const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "api-token": app.universalApiToken,
          "user-email": app.userEmailForUniversalApiToken,
        },
        url: 'https://www.universal-tutorial.com/api/getaccesstoken',
      };
      const data = await axios(options);
      token = data.data.auth_token;
      setLocationData(token);
    }

    dispatch(generateLocationAuthTokenSuccess({ token }));
  } catch (error) {
    removeLocationData();
    dispatch(generateLocationAuthTokenError(error.response ? error.response.data : error));
  }

  return token;
};

export const LOCATION_GET_COUNTRIES = "LOCATION_GET_COUNTRIES";
export const LOCATION_GET_COUNTRIES_SUCCESS = "LOCATION_GET_COUNTRIES_SUCCESS";
export const LOCATION_GET_COUNTRIES_ERROR = "LOCATION_GET_COUNTRIES_ERROR";

export const getCountriesProcess = () => ({
  type: LOCATION_GET_COUNTRIES
});

export const getCountriesSuccess = data => ({
  type: LOCATION_GET_COUNTRIES_SUCCESS,
  data
});

export const getCountriesError = error => ({
  type: LOCATION_GET_COUNTRIES_ERROR,
  error
});

const transformCountries = (arr) => {
  return arr.map(i => ({
    value: i.country_name,
    label: i.country_name,
  }));
};

export const getCountries = () => async (dispatch, getState) => {
  const token = getState().location.authToken;

  try {
    dispatch(getCountriesProcess());
    const options = {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      "api-token": app.universalApiToken,
      url: 'https://www.universal-tutorial.com/api/countries/',
    };

    const res = await axios(options);

    dispatch(getCountriesSuccess(transformCountries(res.data)));
  } catch (error) {
    dispatch(getCountriesError(error.response ? error.response.data : error));
  }
};

export const LOCATION_GET_STATES = "LOCATION_GET_STATES";
export const LOCATION_GET_STATES_SUCCESS = "LOCATION_GET_STATES_SUCCESS";
export const LOCATION_GET_STATES_ERROR = "LOCATION_GET_STATES_ERROR";

export const getStatesProcess = () => ({
  type: LOCATION_GET_STATES
});

export const getStatesSuccess = data => ({
  type: LOCATION_GET_STATES_SUCCESS,
  data
});

export const getStatesError = error => ({
  type: LOCATION_GET_STATES_ERROR,
  error
});

const transformStates = (arr) => {
  return arr.map(i => ({
    value: i.state_name,
    label: i.state_name,
  }));
};

export const getStates = (country) => async (dispatch, getState) => {
  const token = getState().location.authToken;

  try {
    dispatch(getStatesProcess());
    const options = {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      url: `https://www.universal-tutorial.com/api/states/${country}`,
    };

    const res = await axios(options);

    dispatch(getStatesSuccess(transformStates(res.data)));
  } catch (error) {
    dispatch(getStatesError(error.response ? error.response.data : error));
  }
};

export const LOCATION_GET_CITIES = "LOCATION_GET_CITIES";
export const LOCATION_GET_CITIES_SUCCESS = "LOCATION_GET_CITIES_SUCCESS";
export const LOCATION_GET_CITIES_ERROR = "LOCATION_GET_CITIES_ERROR";

export const getCitiesProcess = () => ({
  type: LOCATION_GET_CITIES
});

export const getCitiesSuccess = data => ({
  type: LOCATION_GET_CITIES_SUCCESS,
  data
});

export const getCitiesError = error => ({
  type: LOCATION_GET_CITIES_ERROR,
  error
});

const transformCities = (arr) => {
  return arr.map(i => ({
    value: i.city_name,
    label: i.city_name,
  }));
};

export const getCities = (state) => async (dispatch, getState) => {
  const token = getState().location.authToken;

  try {
    dispatch(getCitiesProcess());
    const options = {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      url: `https://www.universal-tutorial.com/api/cities/${state}`,
    };

    const res = await axios(options);

    dispatch(getCitiesSuccess(transformCities(res.data)));
  } catch (error) {
    dispatch(getCitiesError(error.response ? error.response.data : error));
  }
};