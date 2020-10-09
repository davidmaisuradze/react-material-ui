import * as Yup from 'yup';
import checkoutFormModel from './FormModel';
import { gender as genderData } from 'config/constants';

const {
    formField: {
        firstName,
        lastName,
        address,
        zipcode,
        country,
        gender,
        phone,
        admins
    }
} = checkoutFormModel;

export const firstStepForIndividual = Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [address.name]: Yup.string().required(`${address.requiredErrorMsg}`),
    [country.name]: Yup.string().required(`${country.requiredErrorMsg}`),
    [zipcode.name]: Yup.string().required(`${zipcode.requiredErrorMsg}`).test(
        'len',
        `${zipcode.invalidErrorMsg}`,
        val => val && val.length === 5
    ),
    [gender.name]: Yup.string().oneOf(genderData.map(i => i.value)).required(`${gender.requiredErrorMsg}`)
});

export const firstStepForNonIndividual = Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [address.name]: Yup.string().required(`${address.requiredErrorMsg}`),
    [country.name]: Yup.string().required(`${country.requiredErrorMsg}`),
    [phone.name]: Yup.string().required(`${phone.requiredErrorMsg}`),
});

export const lastStep = Yup.object().shape({
    [admins.name]: Yup.array().of(Yup.string()).required(`${admins.requiredErrorMsg}`)
});
