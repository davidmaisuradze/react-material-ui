export default {
    formId: 'checkoutForm',
    formField: {
      name: {
        name: 'firstName',
        label: 'Name*',
        requiredErrorMsg: 'Name is required'
      },
      firstName: {
        name: 'firstName',
        label: 'First name*',
        requiredErrorMsg: 'First name is required'
      },
      gender: {
        name: 'gender',
        label: 'Gender*',
        requiredErrorMsg: 'Gender is required'
      },
      lastName: {
        name: 'lastName',
        label: 'Last name*',
        requiredErrorMsg: 'Last name is required'
      },
      emailAddress: {
        name: 'emailAddress',
        label: 'Email',
        requiredErrorMsg: 'Email is required'
      },
      address: {
        name: 'address',
        label: 'Address*',
        requiredErrorMsg: 'Address is required'
      },
      city: {
        name: 'city',
        label: 'City',
        requiredErrorMsg: 'City is required'
      },
      state: {
        name: 'state',
        label: 'State/Province/Region',
        requiredErrorMsg: 'State is required'
      },
      zipcode: {
        name: 'zipcode',
        label: 'Zipcode*',
        requiredErrorMsg: 'Zipcode is required',
        invalidErrorMsg: 'Zipcode is not valid (e.g. 70000)'
      },
      phone: {
        name: 'phone',
        label: 'Phone Number*',
        requiredErrorMsg: 'Phone is required',
        invalidErrorMsg: 'Phone is invalid'
      },
      country: {
        name: 'country',
        label: 'Country*',
        requiredErrorMsg: 'Country is required'
      },
      useAddressForPaymentDetails: {
        name: 'useAddressForPaymentDetails',
        label: 'Use this address for payment details'
      },
      admins: {
        name: 'admins',
        label: 'Admins*',
        requiredErrorMsg: 'Please select admins'
      }
    }
  };
