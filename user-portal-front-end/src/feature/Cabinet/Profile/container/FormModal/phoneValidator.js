import app from "../../../../../config/app";
import axios from "axios";
import checkoutFormModel from './FormModel';

const { formField: { phone } } = checkoutFormModel;
const url = 'http://apilayer.net/api/validate';

export const validatePhone = async (value) => {
  // if(!value) {
  //   return phone.requiredErrorMsg;
  // }

  // let error = null;
  // const options = {
  //   params: {
  //     access_key: app.numverifyKey,
  //     number: value,
  //   }
  // };

  // try {
  //   const res = await axios.get(url, options);
  //   if(!res.data.valid) {
  //     // error = phone.invalidErrorMsg;
  //   }
  // } catch(e) {
  //   // error = phone.invalidErrorMsg;
  // }

  // return error;
};

export const validationMock = async (value) => {
  // if(!value) {
  //   return 'Required';
  // }

  // return new Promise((res, rej) => {
  //   setTimeout(() => {
  //     console.log(`valid if (${value.length}) > 10`);
  //     value.length <= 10 ? res('Invalid phone') : res(null);
  //   }, 1000)
  // });
};
