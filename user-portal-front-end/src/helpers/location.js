const localStorageApiProp = 'locationAuthToken';

export const setLocationData = (data) => {
  localStorage.setItem(localStorageApiProp, data);
};

export const getLocationData = () => {
  return localStorage.getItem(localStorageApiProp);
};

export const removeLocationData = () => {
  localStorage.removeItem(localStorageApiProp);
};